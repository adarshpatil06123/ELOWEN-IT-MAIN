package com.elowen.jobportal.search.controller;

import com.elowen.jobportal.search.dto.JobSearchResponse;
import com.elowen.jobportal.search.service.SearchService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@Slf4j
@RestController
@RequestMapping("/search")
@RequiredArgsConstructor
public class SearchController {

    private final SearchService searchService;

    @GetMapping("/jobs")
    public ResponseEntity<Page<JobSearchResponse>> searchJobs(
            @RequestParam(required = false) String keyword,
            @RequestParam(required = false) String category,
            @RequestParam(required = false) String location,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "20") int size) {
        
        log.info("Search request - keyword: {}, category: {}, location: {}", keyword, category, location);
        
        Page<JobSearchResponse> results;
        PageRequest pageable = PageRequest.of(page, size);
        
        if (category != null && !category.isEmpty()) {
            results = searchService.searchByCategory(category, pageable);
        } else if (location != null && !location.isEmpty()) {
            results = searchService.searchByLocation(location, pageable);
        } else {
            results = searchService.searchJobs(keyword, pageable);
        }
        
        return ResponseEntity.ok(results);
    }

    @GetMapping("/jobs/featured")
    public ResponseEntity<Page<JobSearchResponse>> getFeaturedJobs(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        log.info("Get featured jobs request");
        Page<JobSearchResponse> results = searchService.getFeaturedJobs(PageRequest.of(page, size));
        return ResponseEntity.ok(results);
    }
}
