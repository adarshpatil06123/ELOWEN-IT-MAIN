package com.elowen.jobportal.consultant.dto.response;

import com.elowen.jobportal.consultant.domain.enums.VerificationStatus;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

/**
 * Response DTO for candidate verification
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class VerificationResponse {

    private Long id;
    private Long candidateId;
    private String candidateName;
    private VerificationStatus status;

    // Police Verification
    private Boolean policeVerificationDone;
    private LocalDateTime policeVerificationDate;
    private String policeVerificationDocumentUrl;
    private String policeVerificationRemarks;

    // Health Check
    private Boolean healthCheckDone;
    private LocalDateTime healthCheckDate;
    private String healthCheckDocumentUrl;
    private String healthCheckRemarks;

    // Background Verification
    private Boolean backgroundVerificationDone;
    private LocalDateTime backgroundVerificationDate;
    private String backgroundVerificationRemarks;

    // Reference Check
    private Boolean referenceCheckDone;
    private String referenceName;
    private String referencePhone;
    private String referenceRemarks;

    // Overall
    private LocalDateTime verifiedAt;
    private String verifiedBy;
    private String verificationNotes;
    private String rejectionReason;

    // Progress
    private Integer verificationProgress; // 0-100%
    private Boolean isFullyVerified;

    // Timestamps
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
