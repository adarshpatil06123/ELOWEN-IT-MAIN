package com.elowen.jobportal.job.controller;

import com.elowen.jobportal.contracts.constants.HeaderConstants;
import com.elowen.jobportal.contracts.dto.JobCardResponse;
import com.elowen.jobportal.contracts.dto.JobListResponse;
import com.elowen.jobportal.job.dto.JobRequest;
import com.elowen.jobportal.job.dto.request.JobFilterRequest;
import com.elowen.jobportal.job.dto.response.JobDetailResponse;
import com.elowen.jobportal.job.service.JobService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@Slf4j
@RestController
@RequestMapping("/api/jobs")
@RequiredArgsConstructor
public class JobController {

    private final JobService jobService;
    
    // WHY: Max page size prevents abuse and ensures consistent API performance
    private static final int MAX_PAGE_SIZE = 50;

    @PostMapping
    public ResponseEntity<JobCardResponse> createJob(
            @RequestHeader(HeaderConstants.USER_ID) Long userId,
            @Valid @RequestBody JobRequest request) {
        log.info("Create job request from employer: {}", userId);
        JobCardResponse response = jobService.createJob(userId, request);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    /**
     * Get paginated job list with advanced filters (lightweight response for home page)
     * ALWAYS returns status = ACTIVE jobs only
     * WHY: Max page size enforced to prevent large page abuse
     */
    @GetMapping
    public ResponseEntity<Page<JobListResponse>> getAllJobs(
            @RequestParam(required = false, defaultValue = "0") Integer page,
            @RequestParam(required = false, defaultValue = "20") Integer size,
            @RequestParam(required = false) String location,
            @RequestParam(required = false) String category,
            @RequestParam(required = false) String experience,
            @RequestParam(required = false) Integer minSalary,
            @RequestParam(required = false) Integer maxSalary,
            @RequestParam(required = false) String sort,
            @RequestHeader(value = HeaderConstants.USER_ID, required = false) Long userId) {
        
        // WHY: Enforce max page size to prevent abuse
        int validatedSize = Math.min(size != null ? size : 20, MAX_PAGE_SIZE);
        
        log.info("Get all jobs - page: {}, size: {}, location: {}, category: {}, userId: {}", 
                page, validatedSize, location, category, userId);
        
        JobFilterRequest filters = JobFilterRequest.builder()
                .location(location)
                .category(category)
                .experience(experience)
                .minSalary(minSalary)
                .maxSalary(maxSalary)
                .sort(sort)
                .build();
        
        Page<JobListResponse> jobs = jobService.getAllJobsWithFilters(userId, page, validatedSize, filters);
        return ResponseEntity.ok(jobs);
    }

    /**
     * Get recommended jobs for user (reuses existing logic with smart defaults)
     * WHY: Simple recommendation without ML - just recent jobs + location match
     * WHY: Reuses getAllJobsWithFilters to avoid code duplication
     */
    @GetMapping("/recommended")
    public ResponseEntity<Page<JobListResponse>> getRecommendedJobs(
            @RequestParam(required = false, defaultValue = "0") Integer page,
            @RequestParam(required = false, defaultValue = "10") Integer size,
            @RequestHeader(value = HeaderConstants.USER_ID, required = false) Long userId) {
        
        // WHY: Enforce max page size
        int validatedSize = Math.min(size != null ? size : 10, MAX_PAGE_SIZE);
        
        log.info("Get recommended jobs - page: {}, size: {}, userId: {}", page, validatedSize, userId);
        
        // WHY: Default sorting = recent + relevant
        JobFilterRequest filters = JobFilterRequest.builder()
                .sort("date")  // Most recent jobs
                .build();
        
        // WHY: Reuse existing logic - no need for separate recommendation service
        Page<JobListResponse> jobs = jobService.getAllJobsWithFilters(userId, page, validatedSize, filters);
        return ResponseEntity.ok(jobs);
    }

    /**
     * Get detailed job information (for "View More" page)
     * WHY: Async view tracking added to avoid blocking response
     */
    @GetMapping("/{jobId}/details")
    public ResponseEntity<JobDetailResponse> getJobDetails(
            @PathVariable Long jobId,
            @RequestHeader(value = HeaderConstants.USER_ID, required = false) Long userId) {
        log.info("Get job details: {}, userId: {}", jobId, userId);
        JobDetailResponse response = jobService.getJobDetails(jobId, userId);
        return ResponseEntity.ok(response);
    }
}
