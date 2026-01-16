package com.elowen.jobportal.contracts.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

/**
 * Job Card Response DTO - Used across services
 * Represents minimal job information for list views
 */
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class JobCardResponse {
    
    private Long id;
    private String title;
    private String company;
    private String location;
    private String category;
    private String salary;
    private String experience;
    private Boolean featured;
    
    // User-specific flags (default to false if not available)
    @Builder.Default
    private Boolean isSaved = false;
    
    @Builder.Default
    private Boolean isApplied = false;
    
    private Integer applicationsCount;
    private Integer views;
    
    @JsonFormat(pattern = "yyyy-MM-dd'T'HH:mm:ss")
    private LocalDateTime createdAt;
    
    @JsonFormat(pattern = "yyyy-MM-dd'T'HH:mm:ss")
    private LocalDateTime expiresAt;
}
