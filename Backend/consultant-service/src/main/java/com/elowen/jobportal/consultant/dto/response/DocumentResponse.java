package com.elowen.jobportal.consultant.dto.response;

import com.elowen.jobportal.consultant.domain.enums.DocumentStatus;
import com.elowen.jobportal.consultant.domain.enums.DocumentType;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

/**
 * Response DTO for consultant document
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class DocumentResponse {

    private Long id;
    private DocumentType documentType;
    private String documentName;
    private String documentUrl;
    private String documentNumber;
    private DocumentStatus status;
    private String rejectionReason;
    private LocalDateTime verifiedAt;
    private String verifiedBy;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
