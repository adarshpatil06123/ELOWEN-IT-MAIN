package com.elowen.jobportal.consultant.dto.request;

import com.elowen.jobportal.consultant.domain.enums.VerificationStatus;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

/**
 * Request DTO for updating candidate verification
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UpdateVerificationRequest {

    private VerificationStatus status;

    // Police Verification
    private Boolean policeVerificationDone;
    private LocalDateTime policeVerificationDate;
    
    @Size(max = 500, message = "Police verification document URL must not exceed 500 characters")
    private String policeVerificationDocumentUrl;
    
    @Size(max = 500, message = "Police verification remarks must not exceed 500 characters")
    private String policeVerificationRemarks;

    // Health Check
    private Boolean healthCheckDone;
    private LocalDateTime healthCheckDate;
    
    @Size(max = 500, message = "Health check document URL must not exceed 500 characters")
    private String healthCheckDocumentUrl;
    
    @Size(max = 500, message = "Health check remarks must not exceed 500 characters")
    private String healthCheckRemarks;

    // Background Verification
    private Boolean backgroundVerificationDone;
    private LocalDateTime backgroundVerificationDate;
    
    @Size(max = 500, message = "Background verification remarks must not exceed 500 characters")
    private String backgroundVerificationRemarks;

    // Reference Check
    private Boolean referenceCheckDone;
    
    @Size(max = 200, message = "Reference name must not exceed 200 characters")
    private String referenceName;
    
    @Size(max = 15, message = "Reference phone must not exceed 15 characters")
    private String referencePhone;
    
    @Size(max = 500, message = "Reference remarks must not exceed 500 characters")
    private String referenceRemarks;

    @Size(max = 1000, message = "Verification notes must not exceed 1000 characters")
    private String verificationNotes;

    @Size(max = 500, message = "Rejection reason must not exceed 500 characters")
    private String rejectionReason;
}
