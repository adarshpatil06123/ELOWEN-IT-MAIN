package com.elowen.jobportal.job.service;

import com.elowen.jobportal.contracts.dto.JobCardResponse;
import com.elowen.jobportal.contracts.dto.JobListResponse;
import com.elowen.jobportal.job.client.ApplicationServiceClient;
import com.elowen.jobportal.job.client.UserServiceClient;
import com.elowen.jobportal.job.dto.JobRequest;
import com.elowen.jobportal.job.dto.request.JobFilterRequest;
import com.elowen.jobportal.job.dto.response.CompanyInfoDto;
import com.elowen.jobportal.job.dto.response.JobBasicInfoResponse;
import com.elowen.jobportal.job.dto.response.JobDetailResponse;
import com.elowen.jobportal.job.dto.response.LocationDto;
import com.elowen.jobportal.job.dto.response.SalaryDto;
import com.elowen.jobportal.job.entity.Job;
import com.elowen.jobportal.job.entity.JobStatus;
import com.elowen.jobportal.job.entity.JobType;
import com.elowen.jobportal.job.event.JobPostedEvent;
import com.elowen.jobportal.job.exception.JobNotFoundException;
import com.elowen.jobportal.job.repository.JobRepository;
import com.elowen.jobportal.job.specification.JobSpecification;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.*;
import java.util.stream.Collectors;

@Slf4j
@Service
@RequiredArgsConstructor
public class JobService {

    private final JobRepository jobRepository;
    private final RabbitTemplate rabbitTemplate;
    private final UserServiceClient userServiceClient;
    private final ApplicationServiceClient applicationServiceClient;

    @Transactional
    public JobCardResponse createJob(Long employerId, JobRequest request) {
        Job job = Job.builder()
                .title(request.getTitle())
                .company(request.getCompany())
                .location(request.getLocation())
                .category(request.getCategory())
                .salary(request.getSalary())
                .minSalary(request.getMinSalary())
                .maxSalary(request.getMaxSalary())
                .experience(request.getExperience())
                .languages(request.getLanguages())
                .industry(request.getIndustry())
                .functionalArea(request.getFunctionalArea())
                .experienceLevel(request.getExperienceLevel())
                .employmentType(request.getEmploymentType())
                .joiningPeriod(request.getJoiningPeriod())
                .companyDocs(request.getCompanyDocs())
                .description(request.getDescription())
                .requirements(request.getRequirements())
                .benefits(request.getBenefits())
                .jobType(parseJobType(request.getJobType()))
                .featured(request.getFeatured() != null ? request.getFeatured() : false)
                .status(JobStatus.ACTIVE)
                .employerId(employerId)
                .views(0)
                .applicationsCount(0)
                .build();

        if (request.getExpiresAt() != null) {
            try {
                job.setExpiresAt(LocalDateTime.parse(request.getExpiresAt()));
            } catch (Exception e) {
                log.warn("Invalid expiry date format: {}", request.getExpiresAt());
            }
        }

        job = jobRepository.save(job);
        log.info("Job created: {} by employer: {}", job.getId(), employerId);

        publishJobPostedEvent(job);

        return mapToResponse(job, employerId);
    }

    @Transactional(readOnly = true)
    public Page<JobCardResponse> getAllJobs(Long userId, Pageable pageable) {
        return jobRepository.findByStatus(JobStatus.ACTIVE, pageable)
                .map(job -> mapToResponse(job, userId));
    }

    /**
     * Get all jobs with filters - OPTIMIZED with batch calls
     * Returns lightweight JobListResponse (not JobCardResponse)
     */
    @Transactional(readOnly = true)
    public Page<JobListResponse> getAllJobsWithFilters(
            Long userId,
            Integer page,
            Integer size,
            JobFilterRequest filters
    ) {
        log.info("Fetching jobs with filters - page: {}, size: {}, userId: {}", page, size, userId);

        // 1. Build specification for filters
        Specification<Job> spec = JobSpecification.withFilters(
                filters != null ? filters.getLocation() : null,
                filters != null ? filters.getCategory() : null,
                filters != null ? filters.getExperience() : null,
                filters != null ? filters.getMinSalary() : null,
                filters != null ? filters.getMaxSalary() : null,
                JobStatus.ACTIVE
        );

        Pageable pageable = buildPageable(page != null ? page : 0, size != null ? size : 20, filters);

        // 2. Fetch jobs in single query
        Page<Job> jobsPage = jobRepository.findAll(spec, pageable);
        log.info("Found {} jobs", jobsPage.getTotalElements());

        if (jobsPage.isEmpty()) {
            return Page.empty(pageable);
        }

        // 3. Extract job IDs once
        List<Long> jobIds = jobsPage.getContent().stream()
                .map(Job::getId)
                .collect(Collectors.toList());

        // 4. Batch fetch saved jobs (with fallback)
        Set<Long> savedJobIds = fetchSavedJobIds(userId, jobIds);

        // 5. Batch fetch applied jobs (with fallback)
        Set<Long> appliedJobIds = fetchAppliedJobIds(userId, jobIds);

        // 6. Map to response DTOs
        List<JobListResponse> responses = jobsPage.getContent().stream()
                .map(job -> mapToListResponse(job, savedJobIds, appliedJobIds))
                .collect(Collectors.toList());

        return new PageImpl<>(responses, pageable, jobsPage.getTotalElements());
    }

    /**
     * Get job details - READ-ONLY transaction with optimized query
     */
    @Transactional(readOnly = true)
    public JobDetailResponse getJobDetails(Long jobId, Long userId) {
        log.info("Fetching detailed job information for jobId: {}, userId: {}", jobId, userId);

        // Fetch job with details (could be optimized with @EntityGraph if needed)
        Job job = jobRepository.findById(jobId)
                .orElseThrow(() -> new JobNotFoundException(jobId));

        // Fetch user-specific flags with fallback
        boolean isSaved = false;
        boolean isApplied = false;

        if (userId != null) {
            isSaved = fetchSavedJobIds(userId, List.of(jobId)).contains(jobId);
            isApplied = fetchAppliedJobIds(userId, List.of(jobId)).contains(jobId);
        }

        // Increment view count asynchronously AFTER returning response (non-blocking)
        // Note: Removed from here to avoid transaction rollback issues
        
        return mapToDetailResponse(job, userId, isSaved, isApplied);
    }

    @Transactional
    public void incrementApplicationCount(Long jobId) {
        Job job = jobRepository.findById(jobId)
                .orElseThrow(() -> new JobNotFoundException(jobId));
        job.setApplicationsCount(job.getApplicationsCount() + 1);
        jobRepository.save(job);
    }

    /**
     * Check if job exists and is ACTIVE
     * Used by application-service before allowing applications
     */
    @Transactional(readOnly = true)
    public boolean isJobActive(Long jobId) {
        return jobRepository.findById(jobId)
                .map(job -> job.getStatus() == JobStatus.ACTIVE)
                .orElse(false);
    }
    
    /**
     * Get basic job info for application-service (INTERNAL USE ONLY)
     * WHY: Lightweight response for internal service communication
     * WHY: Prevents exposing full job details to internal APIs
     */
    @Transactional(readOnly = true)
    public JobBasicInfoResponse getJobBasicInfo(Long jobId) {
        Job job = jobRepository.findById(jobId)
                .orElseThrow(() -> new JobNotFoundException(jobId));
        
        return JobBasicInfoResponse.builder()
                .jobId(job.getId())
                .status(job.getStatus() != null ? job.getStatus().name() : null)
                .applicationDeadline(job.getExpiresAt())
                .build();
    }

    /**
     * Batch fetch saved job IDs with graceful fallback
     * WHY: If user-service fails, job listing APIs STILL return 200 OK
     * WHY: Default to false (not saved) on failure - safe assumption
     */
    private Set<Long> fetchSavedJobIds(Long userId, List<Long> jobIds) {
        if (userId == null || jobIds.isEmpty()) {
            return Collections.emptySet();
        }

        try {
            return userServiceClient.getSavedJobIds(userId, jobIds);
        } catch (Exception e) {
            log.error("Failed to fetch saved job IDs from user-service. Defaulting to empty set.", e);
            return Collections.emptySet();  // Graceful fallback
        }
    }

    /**
     * Batch fetch applied job IDs with graceful fallback
     * WHY: If application-service fails, job listing APIs STILL return 200 OK
     * WHY: Default to false (not applied) on failure - safe assumption
     */
    private Set<Long> fetchAppliedJobIds(Long userId, List<Long> jobIds) {
        if (userId == null || jobIds.isEmpty()) {
            return Collections.emptySet();
        }

        try {
            return applicationServiceClient.getAppliedJobIds(userId, jobIds);
        } catch (Exception e) {
            log.error("Failed to fetch applied job IDs from application-service. Defaulting to empty set.", e);
            return Collections.emptySet();  // Graceful fallback
        }
    }

    /**
     * Map Job entity to lightweight JobListResponse
     */
    private JobListResponse mapToListResponse(Job job, Set<Long> savedJobIds, Set<Long> appliedJobIds) {
        return JobListResponse.builder()
                .id(job.getId())
                .title(job.getTitle())
                .company(job.getCompany())
                .location(job.getLocation())
                .city(job.getCity())
                .state(job.getState())
                .category(job.getCategory())
                .salaryDisplayText(job.getSalary())
                .minSalary(job.getMinSalary())
                .maxSalary(job.getMaxSalary())
                .experience(job.getExperience())
                .languages(job.getLanguages())
                .jobType(job.getJobType() != null ? job.getJobType().name() : null)
                .featured(job.getFeatured())
                .isSaved(savedJobIds.contains(job.getId()))
                .isApplied(appliedJobIds.contains(job.getId()))
                .applicationsCount(job.getApplicationsCount())
                .postedDate(job.getCreatedAt())
                .expiresAt(job.getExpiresAt())
                .build();
    }

    /**
     * WHY: Async view tracking - does NOT block API response
     * WHY: Simple implementation without affecting performance
     */
    @Async
    private void incrementViewCount(Long jobId) {
        try {
            jobRepository.incrementViewCount(jobId);
            log.debug("View count incremented for job: {}", jobId);
        } catch (Exception e) {
            log.error("Failed to increment view count for job: {}", jobId, e);
            // WHY: Swallow exception - view tracking failure should NOT affect job detail API
        }
    }

    private Pageable buildPageable(Integer page, Integer size, JobFilterRequest filters) {
        int pageNumber = page != null ? page : 0;
        int pageSize = size != null ? size : 20;
        
        String sortField = "createdAt";
        Sort.Direction direction = Sort.Direction.DESC;

        if (filters != null && filters.getSort() != null) {
            switch (filters.getSort().toLowerCase()) {
                case "salary":
                    sortField = "salary";
                    direction = Sort.Direction.DESC;
                    break;
                case "date":
                    sortField = "createdAt";
                    direction = Sort.Direction.DESC;
                    break;
                case "relevance":
                default:
                    sortField = "createdAt";
                    direction = Sort.Direction.DESC;
                    break;
            }
        }

        return PageRequest.of(pageNumber, pageSize, Sort.by(direction, sortField));
    }

    private void publishJobPostedEvent(Job job) {
        try {
            JobPostedEvent event = new JobPostedEvent(
                    job.getId(),
                    job.getTitle(),
                    job.getCompany(),
                    job.getLocation(),
                    job.getCategory()
            );
            rabbitTemplate.convertAndSend("job-exchange", "job.posted", event);
            log.info("Published JobPostedEvent for job: {}", job.getId());
        } catch (Exception e) {
            log.error("Failed to publish JobPostedEvent", e);
        }
    }

    private JobCardResponse mapToResponse(Job job, Long userId) {
        return JobCardResponse.builder()
                .id(job.getId())
                .title(job.getTitle())
                .company(job.getCompany())
                .location(job.getLocation())
                .category(job.getCategory())
                .salary(job.getSalary())
                .experience(job.getExperience())
                .featured(job.getFeatured())
                .applicationsCount(job.getApplicationsCount())
                .views(job.getViews())
                .createdAt(job.getCreatedAt())
                .expiresAt(job.getExpiresAt())
                .build();
    }

    private JobDetailResponse mapToDetailResponse(Job job, Long userId, boolean isSaved, boolean isApplied) {
        LocationDto location = LocationDto.builder()
                .city(job.getLocation())
                .state(null)
                .country("India")
                .build();

        SalaryDto salary = SalaryDto.builder()
                .displayText(job.getSalary())
                .currency("INR")
                .build();

        // WHY: Company fields inlined - no separate CompanyInfoDto needed
        return JobDetailResponse.builder()
                .id(job.getId())
                .title(job.getTitle())
                .companyName(job.getCompany())
                .companyLogoUrl(job.getCompanyLogoUrl())
                .location(job.getLocation())
                .locationDto(location)
                .salary(job.getSalary())
                .salaryDto(salary)
                .category(job.getCategory())
                .industry(job.getIndustry())
                .functionalArea(job.getFunctionalArea())
                .experienceLevel(job.getExperienceLevel())
                .description(job.getDescription())
                .requirements(job.getRequirements())
                .benefits(job.getBenefits())
                .jobType(job.getJobType() != null ? job.getJobType().name() : null)
                .employmentType(job.getEmploymentType())
                .joiningDate(null)
                .joiningPeriod(job.getJoiningPeriod())
                .companyDocs(job.getCompanyDocs())
                .languages(job.getLanguages())
                .featured(job.getFeatured())
                .views(job.getViews())
                .applicationsCount(job.getApplicationsCount())
                .vacancies(1)
                // WHY: User-specific flags overlaid dynamically - NEVER cache these
                .isSaved(isSaved)
                .isApplied(isApplied)
                .status(job.getStatus() != null ? job.getStatus().name() : null)
                .postedDate(job.getCreatedAt())
                .applicationDeadline(job.getExpiresAt())
                .expiresAt(job.getExpiresAt())
                .build();
    }

    private JobType parseJobType(String jobType) {
        if (jobType == null || jobType.isEmpty()) {
            return JobType.FULL_TIME;
        }
        try {
            return JobType.valueOf(jobType.toUpperCase());
        } catch (IllegalArgumentException e) {
            return JobType.FULL_TIME;
        }
    }
}
