package com.elowen.jobportal.consultant.dto.request;

import com.elowen.jobportal.consultant.domain.enums.DocumentType;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * Request DTO for uploading consultant document
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class DocumentUploadRequest {

    @NotNull(message = "Document type is required")
    private DocumentType documentType;

    @NotBlank(message = "Document name is required")
    @Size(max = 200, message = "Document name must not exceed 200 characters")
    private String documentName;

    @NotBlank(message = "Document URL is required")
    @Size(max = 500, message = "Document URL must not exceed 500 characters")
    private String documentUrl;

    @Size(max = 100, message = "Document number must not exceed 100 characters")
    private String documentNumber;
}
