package com.elowen.jobportal.search.service;

import com.elowen.jobportal.search.document.JobDocument;
import com.elowen.jobportal.search.dto.JobSearchResponse;
import com.elowen.jobportal.search.repository.JobSearchRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Slf4j
@Service
@RequiredArgsConstructor
public class SearchService {

    private final JobSearchRepository searchRepository;

    public Page<JobSearchResponse> searchJobs(String keyword, Pageable pageable) {
        log.info("Searching jobs with keyword: {}", keyword);
        
        if (keyword == null || keyword.trim().isEmpty()) {
            return searchRepository.findAll(pageable).map(this::mapToResponse);
        }
        
        return searchRepository.findByTitleContainingOrDescriptionContaining(
                keyword, keyword, pageable
        ).map(this::mapToResponse);
    }

    public Page<JobSearchResponse> searchByCategory(String category, Pageable pageable) {
        log.info("Searching jobs by category: {}", category);
        return searchRepository.findByCategory(category, pageable).map(this::mapToResponse);
    }

    public Page<JobSearchResponse> searchByLocation(String location, Pageable pageable) {
        log.info("Searching jobs by location: {}", location);
        return searchRepository.findByLocation(location, pageable).map(this::mapToResponse);
    }

    public Page<JobSearchResponse> getFeaturedJobs(Pageable pageable) {
        log.info("Getting featured jobs");
        return searchRepository.findByFeaturedTrue(pageable).map(this::mapToResponse);
    }

    public void indexJob(JobDocument jobDocument) {
        log.info("Indexing job: {}", jobDocument.getJobId());
        searchRepository.save(jobDocument);
    }

    public void deleteJob(Long jobId) {
        log.info("Deleting job from index: {}", jobId);
        searchRepository.findByJobId(jobId).forEach(doc -> 
            searchRepository.deleteById(doc.getId())
        );
    }

    private JobSearchResponse mapToResponse(JobDocument doc) {
        return JobSearchResponse.builder()
                .jobId(doc.getJobId())
                .title(doc.getTitle())
                .company(doc.getCompany())
                .location(doc.getLocation())
                .category(doc.getCategory())
                .salary(doc.getSalary())
                .experience(doc.getExperience())
                .description(doc.getDescription())
                .jobType(doc.getJobType())
                .featured(doc.getFeatured())
                .views(doc.getViews())
                .applicationsCount(doc.getApplicationsCount())
                .createdAt(doc.getCreatedAt())
                .build();
    }
}
