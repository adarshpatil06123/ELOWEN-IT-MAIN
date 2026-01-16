package com.elowen.jobportal.contracts.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * Application Request DTO - Used when applying to jobs
 */
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ApplicationRequest {
    
    @NotNull(message = "Job ID is required")
    private Long jobId;
    
    @NotNull(message = "User ID is required")
    private Long userId;
    
    private String coverLetter;
    
    private String resumeUrl;
}
