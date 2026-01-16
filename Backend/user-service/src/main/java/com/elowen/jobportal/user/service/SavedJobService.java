package com.elowen.jobportal.user.service;

import com.elowen.jobportal.user.entity.SavedJob;
import com.elowen.jobportal.user.repository.SavedJobRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Slf4j
@Service
@RequiredArgsConstructor
public class SavedJobService {

    private final SavedJobRepository savedJobRepository;

    /**
     * Batch API: Get saved job IDs from a list
     */
    @Transactional(readOnly = true)
    public Set<Long> getSavedJobIds(Long userId, List<Long> jobIds) {
        if (userId == null || jobIds == null || jobIds.isEmpty()) {
            return new HashSet<>();
        }
        return savedJobRepository.findSavedJobIdsByUserIdAndJobIds(userId, jobIds);
    }

    /**
     * Check if a job is saved by user
     */
    @Transactional(readOnly = true)
    public boolean isJobSaved(Long userId, Long jobId) {
        if (userId == null || jobId == null) {
            return false;
        }
        return savedJobRepository.existsByUserIdAndJobId(userId, jobId);
    }

    /**
     * Save a job for user
     */
    @Transactional
    public void saveJob(Long userId, Long jobId) {
        if (savedJobRepository.existsByUserIdAndJobId(userId, jobId)) {
            log.warn("Job {} already saved by user {}", jobId, userId);
            return;
        }

        SavedJob savedJob = SavedJob.builder()
                .userId(userId)
                .jobId(jobId)
                .build();

        savedJobRepository.save(savedJob);
        log.info("Job {} saved by user {}", jobId, userId);
    }

    /**
     * Unsave a job for user
     */
    @Transactional
    public void unsaveJob(Long userId, Long jobId) {
        savedJobRepository.deleteByUserIdAndJobId(userId, jobId);
        log.info("Job {} unsaved by user {}", jobId, userId);
    }

    /**
     * Get all saved job IDs for a user
     */
    @Transactional(readOnly = true)
    public List<Long> getAllSavedJobIds(Long userId) {
        return savedJobRepository.findJobIdsByUserId(userId);
    }
}
