package com.elowen.jobportal.application.service;

import com.elowen.jobportal.application.client.JobServiceClient;
import com.elowen.jobportal.application.dto.ApplicationRequest;
import com.elowen.jobportal.application.dto.ApplicationResponse;
import com.elowen.jobportal.application.entity.ApplicationStatus;
import com.elowen.jobportal.application.entity.JobApplication;
import com.elowen.jobportal.application.event.ApplicationSubmittedEvent;
import com.elowen.jobportal.application.repository.JobApplicationRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Slf4j
@Service
@RequiredArgsConstructor
public class ApplicationService {

    private final JobApplicationRepository applicationRepository;
    private final JobServiceClient jobServiceClient;
    private final RabbitTemplate rabbitTemplate;

    @Transactional
    public ApplicationResponse submitApplication(Long applicantId, ApplicationRequest request) {
        // Verify job exists and is active
        try {
            Boolean isActive = jobServiceClient.isJobActive(request.getJobId());
            if (isActive == null || !isActive) {
                throw new RuntimeException("Job is not available for applications");
            }
        } catch (Exception e) {
            log.error("Failed to verify job status for jobId: {}", request.getJobId(), e);
            throw new RuntimeException("Unable to verify job availability. Please try again later.");
        }
        
        // Check if already applied
        if (applicationRepository.existsByJobIdAndApplicantId(request.getJobId(), applicantId)) {
            throw new RuntimeException("You have already applied to this job");
        }

        JobApplication application = JobApplication.builder()
                .jobId(request.getJobId())
                .applicantId(applicantId)
                .coverLetter(request.getCoverLetter())
                .resumeUrl(request.getResumeUrl())
                .status(ApplicationStatus.PENDING)
                .build();

        application = applicationRepository.save(application);
        log.info("Application submitted: {} for job: {} by applicant: {}", 
                application.getId(), request.getJobId(), applicantId);

        // Notify job service to increment application count
        try {
            jobServiceClient.incrementApplicationCount(request.getJobId());
        } catch (Exception e) {
            log.error("Failed to update job application count", e);
        }

        // Publish event
        publishApplicationSubmittedEvent(application);

        return mapToResponse(application);
    }

    public Page<ApplicationResponse> getMyApplications(Long applicantId, Pageable pageable) {
        return applicationRepository.findByApplicantId(applicantId, pageable)
                .map(this::mapToResponse);
    }

    public Page<ApplicationResponse> getJobApplications(Long jobId, Pageable pageable) {
        return applicationRepository.findByJobId(jobId, pageable)
                .map(this::mapToResponse);
    }

    @Transactional
    public ApplicationResponse updateStatus(Long applicationId, String status) {
        JobApplication application = applicationRepository.findById(applicationId)
                .orElseThrow(() -> new RuntimeException("Application not found"));

        ApplicationStatus newStatus = ApplicationStatus.valueOf(status.toUpperCase());
        application.setStatus(newStatus);
        application = applicationRepository.save(application);

        log.info("Application {} status updated to {}", applicationId, status);
        return mapToResponse(application);
    }

    private void publishApplicationSubmittedEvent(JobApplication application) {
        try {
            ApplicationSubmittedEvent event = new ApplicationSubmittedEvent(
                    application.getId(),
                    application.getJobId(),
                    application.getApplicantId()
            );
            rabbitTemplate.convertAndSend("application-exchange", "application.submitted", event);
            log.info("Published ApplicationSubmittedEvent for application: {}", application.getId());
        } catch (Exception e) {
            log.error("Failed to publish ApplicationSubmittedEvent", e);
        }
    }

    /**
     * Batch API: Get applied job IDs from a list (for job-service)
     */
    @Transactional(readOnly = true)
    public java.util.Set<Long> getAppliedJobIds(Long userId, java.util.List<Long> jobIds) {
        if (userId == null || jobIds == null || jobIds.isEmpty()) {
            return new java.util.HashSet<>();
        }
        return applicationRepository.findAppliedJobIdsByUserIdAndJobIds(userId, jobIds);
    }

    /**
     * Check if user has applied to a job
     */
    @Transactional(readOnly = true)
    public boolean hasApplied(Long userId, Long jobId) {
        if (userId == null || jobId == null) {
            return false;
        }
        return applicationRepository.existsByJobIdAndApplicantId(jobId, userId);
    }

    /**
     * Get application count for a job
     */
    @Transactional(readOnly = true)
    public int getApplicationCountForJob(Long jobId) {
        return applicationRepository.countByJobId(jobId).intValue();
    }

    private ApplicationResponse mapToResponse(JobApplication application) {
        return ApplicationResponse.builder()
                .id(application.getId())
                .jobId(application.getJobId())
                .applicantId(application.getApplicantId())
                .coverLetter(application.getCoverLetter())
                .resumeUrl(application.getResumeUrl())
                .status(application.getStatus().name())
                .rejectionReason(application.getRejectionReason())
                .appliedAt(application.getAppliedAt())
                .reviewedAt(application.getReviewedAt())
                .build();
    }
}
