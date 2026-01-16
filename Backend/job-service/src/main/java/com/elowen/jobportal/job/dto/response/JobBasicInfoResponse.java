package com.elowen.jobportal.job.dto.response;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

/**
 * Basic Job Info Response - INTERNAL USE ONLY
 * Used by application-service to verify job status and deadline
 * before accepting applications.
 * 
 * WHY: Prevents applications to inactive/expired jobs
 * WHY: Lightweight DTO for internal service communication
 */
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class JobBasicInfoResponse {
    
    private Long jobId;
    
    private String status;
    
    @JsonFormat(pattern = "yyyy-MM-dd'T'HH:mm:ss")
    private LocalDateTime applicationDeadline;
}
