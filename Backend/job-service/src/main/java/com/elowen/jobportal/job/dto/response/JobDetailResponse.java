package com.elowen.jobportal.job.dto.response;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

/**
 * Detailed Job Response DTO - Used for "View More" / Job Detail Page
 * Contains complete job information including description, requirements, benefits
 * 
 * WHY CHANGES:
 * - Reviews removed: Future review-service will handle this
 * - Documents removed: No file handling in MVP
 * - Company inlined: No separate Company entity needed for MVP
 * - User-specific flags (isSaved, isApplied) NOT cached - overlaid per request
 */
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class JobDetailResponse {
    
    // Basic Info
    private Long id;
    private String title;
    
    // WHY: Company fields inlined - no Company entity for MVP
    private String companyName;
    private String companyLogoUrl;
    
    private String location;
    private LocationDto locationDto;     // Nested location details
    
    // Categorization
    private String category;
    private String industry;
    private String functionalArea;
    
    // Compensation
    private String salary;
    private SalaryDto salaryDto;         // Nested salary details
    private String experienceLevel;
    
    // Job Details
    private String description;
    private String requirements;
    private String benefits;
    private String jobType;
    
    // Employment Details
    private String employmentType;
    private String joiningDate;
    private String joiningPeriod;
    private String companyDocs;
    private String languages;
    
    // Meta Information
    private Boolean featured;
    private Integer views;
    private Integer applicationsCount;
    private Integer vacancies;
    
    // WHY: User-specific flags - NEVER cache these, overlay dynamically per request
    private Boolean isSaved;
    private Boolean isApplied;
    
    // Status
    private String status;
    
    // Timestamps
    @JsonFormat(pattern = "yyyy-MM-dd'T'HH:mm:ss")
    private LocalDateTime postedDate;
    
    @JsonFormat(pattern = "yyyy-MM-dd'T'HH:mm:ss")
    private LocalDateTime applicationDeadline;
    
    @JsonFormat(pattern = "yyyy-MM-dd'T'HH:mm:ss")
    private LocalDateTime expiresAt;
    
    // TODO: Reviews will be handled by future review-service
    // TODO: Documents/file uploads deferred to post-MVP
}
