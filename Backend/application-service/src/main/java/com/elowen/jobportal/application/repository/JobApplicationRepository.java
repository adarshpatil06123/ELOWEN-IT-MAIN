package com.elowen.jobportal.application.repository;

import com.elowen.jobportal.application.entity.ApplicationStatus;
import com.elowen.jobportal.application.entity.JobApplication;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.Set;

@Repository
public interface JobApplicationRepository extends JpaRepository<JobApplication, Long> {
    
    Page<JobApplication> findByApplicantId(Long applicantId, Pageable pageable);
    
    Page<JobApplication> findByJobId(Long jobId, Pageable pageable);
    
    Optional<JobApplication> findByJobIdAndApplicantId(Long jobId, Long applicantId);
    
    List<JobApplication> findByJobIdAndStatus(Long jobId, ApplicationStatus status);
    
    Long countByJobId(Long jobId);
    
    Boolean existsByJobIdAndApplicantId(Long jobId, Long applicantId);
    
    /**
     * Batch API: Get job IDs that user has applied to from a given list
     */
    @Query("SELECT a.jobId FROM JobApplication a WHERE a.applicantId = :userId AND a.jobId IN :jobIds")
    Set<Long> findAppliedJobIdsByUserIdAndJobIds(@Param("userId") Long userId, @Param("jobIds") List<Long> jobIds);
}
