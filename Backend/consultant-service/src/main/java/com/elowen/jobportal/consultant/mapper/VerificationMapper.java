package com.elowen.jobportal.consultant.mapper;

import com.elowen.jobportal.consultant.domain.entity.Candidate;
import com.elowen.jobportal.consultant.domain.entity.CandidateVerification;
import com.elowen.jobportal.consultant.dto.request.UpdateVerificationRequest;
import com.elowen.jobportal.consultant.dto.response.VerificationResponse;
import org.springframework.stereotype.Component;

/**
 * Mapper for CandidateVerification entity and DTOs
 */
@Component
public class VerificationMapper {

    public VerificationResponse toResponse(CandidateVerification verification) {
        if (verification == null) {
            return null;
        }

        return VerificationResponse.builder()
                .id(verification.getId())
                .candidateId(verification.getCandidate().getId())
                .candidateName(verification.getCandidate().getName())
                .status(verification.getStatus())
                .policeVerificationDone(verification.getPoliceVerificationDone())
                .policeVerificationDate(verification.getPoliceVerificationDate())
                .policeVerificationDocumentUrl(verification.getPoliceVerificationDocumentUrl())
                .policeVerificationRemarks(verification.getPoliceVerificationRemarks())
                .healthCheckDone(verification.getHealthCheckDone())
                .healthCheckDate(verification.getHealthCheckDate())
                .healthCheckDocumentUrl(verification.getHealthCheckDocumentUrl())
                .healthCheckRemarks(verification.getHealthCheckRemarks())
                .backgroundVerificationDone(verification.getBackgroundVerificationDone())
                .backgroundVerificationDate(verification.getBackgroundVerificationDate())
                .backgroundVerificationRemarks(verification.getBackgroundVerificationRemarks())
                .referenceCheckDone(verification.getReferenceCheckDone())
                .referenceName(verification.getReferenceName())
                .referencePhone(verification.getReferencePhone())
                .referenceRemarks(verification.getReferenceRemarks())
                .verifiedAt(verification.getVerifiedAt())
                .verifiedBy(verification.getVerifiedBy())
                .verificationNotes(verification.getVerificationNotes())
                .rejectionReason(verification.getRejectionReason())
                .verificationProgress(verification.getVerificationProgress())
                .isFullyVerified(verification.isFullyVerified())
                .createdAt(verification.getCreatedAt())
                .updatedAt(verification.getUpdatedAt())
                .build();
    }

    public CandidateVerification toEntity(Candidate candidate) {
        return CandidateVerification.builder()
                .candidate(candidate)
                .build();
    }

    public void updateEntityFromRequest(CandidateVerification verification, UpdateVerificationRequest request) {
        if (request.getStatus() != null) {
            verification.setStatus(request.getStatus());
        }
        if (request.getPoliceVerificationDone() != null) {
            verification.setPoliceVerificationDone(request.getPoliceVerificationDone());
        }
        if (request.getPoliceVerificationDate() != null) {
            verification.setPoliceVerificationDate(request.getPoliceVerificationDate());
        }
        if (request.getPoliceVerificationDocumentUrl() != null) {
            verification.setPoliceVerificationDocumentUrl(request.getPoliceVerificationDocumentUrl());
        }
        if (request.getPoliceVerificationRemarks() != null) {
            verification.setPoliceVerificationRemarks(request.getPoliceVerificationRemarks());
        }
        if (request.getHealthCheckDone() != null) {
            verification.setHealthCheckDone(request.getHealthCheckDone());
        }
        if (request.getHealthCheckDate() != null) {
            verification.setHealthCheckDate(request.getHealthCheckDate());
        }
        if (request.getHealthCheckDocumentUrl() != null) {
            verification.setHealthCheckDocumentUrl(request.getHealthCheckDocumentUrl());
        }
        if (request.getHealthCheckRemarks() != null) {
            verification.setHealthCheckRemarks(request.getHealthCheckRemarks());
        }
        if (request.getBackgroundVerificationDone() != null) {
            verification.setBackgroundVerificationDone(request.getBackgroundVerificationDone());
        }
        if (request.getBackgroundVerificationDate() != null) {
            verification.setBackgroundVerificationDate(request.getBackgroundVerificationDate());
        }
        if (request.getBackgroundVerificationRemarks() != null) {
            verification.setBackgroundVerificationRemarks(request.getBackgroundVerificationRemarks());
        }
        if (request.getReferenceCheckDone() != null) {
            verification.setReferenceCheckDone(request.getReferenceCheckDone());
        }
        if (request.getReferenceName() != null) {
            verification.setReferenceName(request.getReferenceName());
        }
        if (request.getReferencePhone() != null) {
            verification.setReferencePhone(request.getReferencePhone());
        }
        if (request.getReferenceRemarks() != null) {
            verification.setReferenceRemarks(request.getReferenceRemarks());
        }
        if (request.getVerificationNotes() != null) {
            verification.setVerificationNotes(request.getVerificationNotes());
        }
        if (request.getRejectionReason() != null) {
            verification.setRejectionReason(request.getRejectionReason());
        }
    }
}
