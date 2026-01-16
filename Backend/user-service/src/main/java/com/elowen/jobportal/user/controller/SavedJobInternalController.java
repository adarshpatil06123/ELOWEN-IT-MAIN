package com.elowen.jobportal.user.controller;

import com.elowen.jobportal.contracts.constants.HeaderConstants;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.elowen.jobportal.user.service.SavedJobService;

import java.util.List;
import java.util.Set;

/**
 * Internal API for Saved Jobs - Called by job-service via Feign
 */
@Slf4j
@RestController
@RequestMapping("/internal/saved-jobs")
@RequiredArgsConstructor
public class SavedJobInternalController {

    private final SavedJobService savedJobService;

    /**
     * Batch API: Check which jobs from a list are saved by user
     * Used by job-service to efficiently set isSaved flags
     */
    @PostMapping("/batch-check")
    public ResponseEntity<Set<Long>> getSavedJobIds(
            @RequestParam Long userId,
            @RequestBody List<Long> jobIds) {
        log.debug("Batch check saved jobs for user: {}, jobIds: {}", userId, jobIds);
        Set<Long> savedJobIds = savedJobService.getSavedJobIds(userId, jobIds);
        return ResponseEntity.ok(savedJobIds);
    }

    /**
     * Single check: Is this job saved by user?
     */
    @GetMapping("/check")
    public ResponseEntity<Boolean> isJobSaved(
            @RequestParam Long userId,
            @RequestParam Long jobId) {
        log.debug("Check if job {} is saved by user {}", jobId, userId);
        boolean isSaved = savedJobService.isJobSaved(userId, jobId);
        return ResponseEntity.ok(isSaved);
    }
}
