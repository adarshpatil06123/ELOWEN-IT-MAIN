package com.elowen.jobportal.job.dto.request;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * DTO for job filtering parameters
 */
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class JobFilterRequest {
    
    private String location;        // City or State
    private String category;        // Job category (Delivery/Transport, etc.)
    private String experience;      // Experience level (Fresher, 1-2 years, etc.)
    private Integer minSalary;      // Minimum salary filter
    private Integer maxSalary;      // Maximum salary filter
    private String sort;            // Sort field (date, salary, relevance)
    
    /**
     * Get sort field with default
     */
    public String getSortOrDefault() {
        return sort != null ? sort : "createdAt";
    }
}
