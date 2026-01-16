package com.elowen.jobportal.application.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ApplicationResponse {
    private Long id;
    private Long jobId;
    private Long applicantId;
    private String coverLetter;
    private String resumeUrl;
    private String status;
    private String rejectionReason;
    private LocalDateTime appliedAt;
    private LocalDateTime reviewedAt;
}
