package com.elowen.jobportal.consultant.mapper;

import com.elowen.jobportal.consultant.domain.entity.Consultant;
import com.elowen.jobportal.consultant.domain.entity.ConsultantDocument;
import com.elowen.jobportal.consultant.dto.request.DocumentUploadRequest;
import com.elowen.jobportal.consultant.dto.response.DocumentResponse;
import org.springframework.stereotype.Component;

/**
 * Mapper for ConsultantDocument entity and DTOs
 */
@Component
public class DocumentMapper {

    public DocumentResponse toResponse(ConsultantDocument document) {
        if (document == null) {
            return null;
        }

        return DocumentResponse.builder()
                .id(document.getId())
                .documentType(document.getDocumentType())
                .documentName(document.getDocumentName())
                .documentUrl(document.getDocumentUrl())
                .documentNumber(document.getDocumentNumber())
                .status(document.getStatus())
                .rejectionReason(document.getRejectionReason())
                .verifiedAt(document.getVerifiedAt())
                .verifiedBy(document.getVerifiedBy())
                .createdAt(document.getCreatedAt())
                .updatedAt(document.getUpdatedAt())
                .build();
    }

    public ConsultantDocument toEntity(DocumentUploadRequest request, Consultant consultant) {
        return ConsultantDocument.builder()
                .consultant(consultant)
                .documentType(request.getDocumentType())
                .documentName(request.getDocumentName())
                .documentUrl(request.getDocumentUrl())
                .documentNumber(request.getDocumentNumber())
                .build();
    }
}
