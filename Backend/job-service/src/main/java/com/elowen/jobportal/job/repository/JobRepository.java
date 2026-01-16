package com.elowen.jobportal.job.repository;

import com.elowen.jobportal.job.entity.Job;
import com.elowen.jobportal.job.entity.JobStatus;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface JobRepository extends JpaRepository<Job, Long>, JpaSpecificationExecutor<Job> {
    
    Page<Job> findByStatus(JobStatus status, Pageable pageable);
    
    Page<Job> findByCategory(String category, Pageable pageable);
    
    Page<Job> findByLocationContaining(String location, Pageable pageable);
    
    Page<Job> findByFeaturedTrue(Pageable pageable);
    
    List<Job> findByEmployerId(Long employerId);
    
    Page<Job> findByStatusAndCategory(JobStatus status, String category, Pageable pageable);
    
    /**
     * Increment view count for a job
     */
    @Modifying
    @Query("UPDATE Job j SET j.views = j.views + 1 WHERE j.id = :jobId")
    void incrementViewCount(@Param("jobId") Long jobId);
    
    /**
     * Increment applications count for a job
     */
    @Modifying
    @Query("UPDATE Job j SET j.applicationsCount = j.applicationsCount + 1 WHERE j.id = :jobId")
    void incrementApplicationCount(@Param("jobId") Long jobId);
}
