package com.elowen.jobportal.application.controller;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.elowen.jobportal.application.service.ApplicationService;

import java.util.List;
import java.util.Set;

/**
 * Internal API for Applications - Called by job-service via Feign
 */
@Slf4j
@RestController
@RequestMapping("/internal/applications")
@RequiredArgsConstructor
public class ApplicationInternalController {

    private final ApplicationService applicationService;

    /**
     * Batch API: Check which jobs from a list have been applied to by user
     * Used by job-service to efficiently set isApplied flags
     */
    @PostMapping("/batch-check")
    public ResponseEntity<Set<Long>> getAppliedJobIds(
            @RequestParam Long userId,
            @RequestBody List<Long> jobIds) {
        log.debug("Batch check applied jobs for user: {}, jobIds: {}", userId, jobIds);
        Set<Long> appliedJobIds = applicationService.getAppliedJobIds(userId, jobIds);
        return ResponseEntity.ok(appliedJobIds);
    }

    /**
     * Single check: Has user applied to this job?
     */
    @GetMapping("/check")
    public ResponseEntity<Boolean> hasApplied(
            @RequestParam Long userId,
            @RequestParam Long jobId) {
        log.debug("Check if user {} applied to job {}", userId, jobId);
        boolean hasApplied = applicationService.hasApplied(userId, jobId);
        return ResponseEntity.ok(hasApplied);
    }

    /**
     * Get application count for a job
     */
    @GetMapping("/job/{jobId}/count")
    public ResponseEntity<Integer> getApplicationCount(@PathVariable Long jobId) {
        int count = applicationService.getApplicationCountForJob(jobId);
        return ResponseEntity.ok(count);
    }
}
