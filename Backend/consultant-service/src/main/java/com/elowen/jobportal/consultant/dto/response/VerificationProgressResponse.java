package com.elowen.jobportal.consultant.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * Verification progress metrics for dashboard
 */
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class VerificationProgressResponse {
    
    private Long totalVerifications;
    private Long pendingVerifications;
    private Long underVerification;
    private Long verifiedCount;
    private Long rejectedCount;
    private Double completionPercentage;
}
