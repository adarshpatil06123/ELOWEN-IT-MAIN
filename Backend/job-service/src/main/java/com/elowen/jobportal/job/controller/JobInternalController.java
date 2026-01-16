package com.elowen.jobportal.job.controller;

import com.elowen.jobportal.job.service.JobService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.elowen.jobportal.job.dto.response.JobBasicInfoResponse;

@Slf4j
@RestController
@RequestMapping("/api/jobs")
@RequiredArgsConstructor
public class JobInternalController {

    private final JobService jobService;

    /**
     * WHY: Called by application-service after user applies
     * WHY: Path standardized to /api/jobs
     */
    @PostMapping("/{jobId}/increment-applications")
    public ResponseEntity<Void> incrementApplicationCount(@PathVariable Long jobId) {
        log.info("Increment application count for job: {}", jobId);
        jobService.incrementApplicationCount(jobId);
        return ResponseEntity.ok().build();
    }
}

@RestController
@RequestMapping("/internal/jobs")
@RequiredArgsConstructor
@Slf4j
class JobInternalApiController {

    private final JobService jobService;

    /**
     * Check if job is active (for application-service)
     * WHY: Prevents applications to inactive jobs
     */
    @GetMapping("/{jobId}/is-active")
    public ResponseEntity<Boolean> isJobActive(@PathVariable Long jobId) {
        boolean isActive = jobService.isJobActive(jobId);
        return ResponseEntity.ok(isActive);
    }
    
    /**
     * Get basic job info (INTERNAL USE ONLY)
     * WHY: Used by application-service to verify job status and deadline
     * WHY: Lightweight DTO prevents exposing full job details internally
     */
    @GetMapping("/{jobId}/basic-info")
    public ResponseEntity<JobBasicInfoResponse> getJobBasicInfo(@PathVariable Long jobId) {
        log.info("Get basic job info for application-service: {}", jobId);
        JobBasicInfoResponse response = jobService.getJobBasicInfo(jobId);
        return ResponseEntity.ok(response);
    }
}
