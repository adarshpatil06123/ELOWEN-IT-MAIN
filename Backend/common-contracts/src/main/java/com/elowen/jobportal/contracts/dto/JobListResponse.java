package com.elowen.jobportal.contracts.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

/**
 * Lightweight Job List Response DTO
 * Used for home page job listings - optimized for performance
 * Does NOT include heavy fields like description, requirements, documents, reviews
 */
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class JobListResponse {
    
    // Core Info
    private Long id;
    private String title;
    private String company;
    
    // Location
    private String location;  // Simplified location string (e.g., "Bangalore, Karnataka")
    private String city;
    private String state;
    
    // Categorization
    private String category;
    private String experience;
    private String languages;
    
    // Salary
    private String salaryDisplayText;  // Pre-formatted display string
    private Integer minSalary;
    private Integer maxSalary;
    
    // Job Type
    private String jobType;
    private Boolean featured;
    
    // User-specific flags (fetched from separate services)
    @Builder.Default
    private Boolean isSaved = false;
    
    @Builder.Default
    private Boolean isApplied = false;
    
    // Metadata
    private Integer applicationsCount;
    
    @JsonFormat(pattern = "yyyy-MM-dd'T'HH:mm:ss")
    private LocalDateTime postedDate;
    
    @JsonFormat(pattern = "yyyy-MM-dd'T'HH:mm:ss")
    private LocalDateTime expiresAt;
}
