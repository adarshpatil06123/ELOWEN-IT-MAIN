package com.elowen.jobportal.user.repository;

import com.elowen.jobportal.user.entity.SavedJob;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.Set;

@Repository
public interface SavedJobRepository extends JpaRepository<SavedJob, Long> {
    
    /**
     * Check if a user has saved a specific job
     */
    boolean existsByUserIdAndJobId(Long userId, Long jobId);
    
    /**
     * Find a saved job by user and job ID
     */
    Optional<SavedJob> findByUserIdAndJobId(Long userId, Long jobId);
    
    /**
     * Get all job IDs saved by a user
     */
    @Query("SELECT s.jobId FROM SavedJob s WHERE s.userId = :userId")
    List<Long> findJobIdsByUserId(@Param("userId") Long userId);
    
    /**
     * Batch check which jobs from a list are saved by user
     */
    @Query("SELECT s.jobId FROM SavedJob s WHERE s.userId = :userId AND s.jobId IN :jobIds")
    Set<Long> findSavedJobIdsByUserIdAndJobIds(@Param("userId") Long userId, @Param("jobIds") List<Long> jobIds);
    
    /**
     * Get all saved jobs for a user
     */
    List<SavedJob> findByUserId(Long userId);
    
    /**
     * Delete a saved job
     */
    void deleteByUserIdAndJobId(Long userId, Long jobId);
}
