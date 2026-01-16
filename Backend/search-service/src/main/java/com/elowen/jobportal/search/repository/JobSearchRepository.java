package com.elowen.jobportal.search.repository;

import com.elowen.jobportal.search.document.JobDocument;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface JobSearchRepository extends ElasticsearchRepository<JobDocument, String> {
    
    Page<JobDocument> findByTitleContainingOrDescriptionContaining(
            String title, String description, Pageable pageable);
    
    Page<JobDocument> findByCategory(String category, Pageable pageable);
    
    Page<JobDocument> findByLocation(String location, Pageable pageable);
    
    Page<JobDocument> findByFeaturedTrue(Pageable pageable);
    
    List<JobDocument> findByJobId(Long jobId);
}
