package com.elowen.jobportal.consultant.service;

import com.elowen.jobportal.consultant.domain.entity.Candidate;
import com.elowen.jobportal.consultant.domain.entity.CandidateVerification;
import com.elowen.jobportal.consultant.domain.enums.VerificationStatus;
import com.elowen.jobportal.consultant.dto.request.UpdateVerificationRequest;
import com.elowen.jobportal.consultant.dto.response.VerificationResponse;
import com.elowen.jobportal.consultant.exception.ResourceNotFoundException;
import com.elowen.jobportal.consultant.mapper.VerificationMapper;
import com.elowen.jobportal.consultant.repository.CandidateRepository;
import com.elowen.jobportal.consultant.repository.CandidateVerificationRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

/**
 * Service for candidate verification management
 */
@Service
@RequiredArgsConstructor
@Slf4j
public class VerificationService {

    private final CandidateVerificationRepository verificationRepository;
    private final CandidateRepository candidateRepository;
    private final VerificationMapper verificationMapper;

    /**
     * Initiate verification for a candidate
     */
    @Transactional
    public VerificationResponse initiateCandidateVerification(Long candidateId) {
        log.info("Initiating verification for candidate ID: {}", candidateId);
        
        Candidate candidate = candidateRepository.findById(candidateId)
                .orElseThrow(() -> new ResourceNotFoundException("Candidate", candidateId));
        
        // Check if verification already exists
        if (verificationRepository.existsByCandidateId(candidateId)) {
            throw new IllegalStateException("Verification already exists for this candidate");
        }
        
        CandidateVerification verification = verificationMapper.toEntity(candidate);
        CandidateVerification savedVerification = verificationRepository.save(verification);
        
        log.info("Verification initiated with ID: {}", savedVerification.getId());
        return verificationMapper.toResponse(savedVerification);
    }

    /**
     * Get verification details by candidate ID
     */
    @Transactional(readOnly = true)
    public VerificationResponse getVerificationByCandidateId(Long consultantId, Long candidateId) {
        log.debug("Fetching verification for candidate ID: {}", candidateId);
        
        CandidateVerification verification = verificationRepository
                .findByCandidateIdAndConsultantId(candidateId, consultantId)
                .orElseThrow(() -> new ResourceNotFoundException("Verification", "candidateId", candidateId));
        
        return verificationMapper.toResponse(verification);
    }

    /**
     * Update verification details
     */
    @Transactional
    public VerificationResponse updateVerification(Long consultantId, Long candidateId, 
                                                   UpdateVerificationRequest request, String verifiedBy) {
        log.info("Updating verification for candidate ID: {}", candidateId);
        
        CandidateVerification verification = verificationRepository
                .findByCandidateIdAndConsultantId(candidateId, consultantId)
                .orElseThrow(() -> new ResourceNotFoundException("Verification", "candidateId", candidateId));
        
        verificationMapper.updateEntityFromRequest(verification, request);
        
        // Auto-update status based on completion
        updateVerificationStatus(verification);
        
        // If fully verified, update candidate and set verification completion
        if (verification.isFullyVerified() && verification.getStatus() != VerificationStatus.VERIFIED) {
            verification.setStatus(VerificationStatus.VERIFIED);
            verification.setVerifiedAt(LocalDateTime.now());
            verification.setVerifiedBy(verifiedBy);
            
            // Update candidate verification status
            Candidate candidate = verification.getCandidate();
            candidate.setIsVerified(true);
            candidateRepository.save(candidate);
        }
        
        CandidateVerification savedVerification = verificationRepository.save(verification);
        
        log.info("Verification updated successfully");
        return verificationMapper.toResponse(savedVerification);
    }

    /**
     * Get all pending verifications for consultant
     */
    @Transactional(readOnly = true)
    public List<VerificationResponse> getPendingVerifications(Long consultantId) {
        log.debug("Fetching pending verifications for consultant ID: {}", consultantId);
        
        List<CandidateVerification> verifications = 
                verificationRepository.findPendingVerificationsByConsultantId(consultantId);
        
        return verifications.stream()
                .map(verificationMapper::toResponse)
                .collect(Collectors.toList());
    }

    /**
     * Get verifications by status
     */
    @Transactional(readOnly = true)
    public List<VerificationResponse> getVerificationsByStatus(Long consultantId, VerificationStatus status) {
        log.debug("Fetching {} verifications for consultant ID: {}", status, consultantId);
        
        List<CandidateVerification> verifications = 
                verificationRepository.findByConsultantIdAndStatus(consultantId, status);
        
        return verifications.stream()
                .map(verificationMapper::toResponse)
                .collect(Collectors.toList());
    }

    /**
     * Get candidates requiring police verification
     */
    @Transactional(readOnly = true)
    public List<VerificationResponse> getCandidatesRequiringPoliceVerification(Long consultantId) {
        log.debug("Fetching candidates requiring police verification");
        
        List<CandidateVerification> verifications = 
                verificationRepository.findRequiringPoliceVerification(consultantId);
        
        return verifications.stream()
                .map(verificationMapper::toResponse)
                .collect(Collectors.toList());
    }

    /**
     * Get candidates requiring health check
     */
    @Transactional(readOnly = true)
    public List<VerificationResponse> getCandidatesRequiringHealthCheck(Long consultantId) {
        log.debug("Fetching candidates requiring health check");
        
        List<CandidateVerification> verifications = 
                verificationRepository.findRequiringHealthCheck(consultantId);
        
        return verifications.stream()
                .map(verificationMapper::toResponse)
                .collect(Collectors.toList());
    }

    /**
     * Update verification status based on completed checks
     */
    private void updateVerificationStatus(CandidateVerification verification) {
        if (verification.isFullyVerified()) {
            verification.setStatus(VerificationStatus.VERIFIED);
        } else if (verification.getPoliceVerificationDone() || 
                   verification.getHealthCheckDone() || 
                   verification.getBackgroundVerificationDone() || 
                   verification.getReferenceCheckDone()) {
            verification.setStatus(VerificationStatus.UNDER_VERIFICATION);
        }
    }

    /**
     * Reject candidate verification
     */
    @Transactional
    public VerificationResponse rejectVerification(Long consultantId, Long candidateId, 
                                                   String rejectionReason, String rejectedBy) {
        log.info("Rejecting verification for candidate ID: {}", candidateId);
        
        CandidateVerification verification = verificationRepository
                .findByCandidateIdAndConsultantId(candidateId, consultantId)
                .orElseThrow(() -> new ResourceNotFoundException("Verification", "candidateId", candidateId));
        
        verification.setStatus(VerificationStatus.REJECTED);
        verification.setRejectionReason(rejectionReason);
        verification.setVerifiedBy(rejectedBy);
        
        // Update candidate verification status
        Candidate candidate = verification.getCandidate();
        candidate.setIsVerified(false);
        candidateRepository.save(candidate);
        
        CandidateVerification savedVerification = verificationRepository.save(verification);
        
        log.info("Verification rejected");
        return verificationMapper.toResponse(savedVerification);
    }

    /**
     * Get verification statistics for consultant
     */
    @Transactional(readOnly = true)
    public java.util.Map<String, Object> getVerificationStatistics(Long consultantId) {
        log.debug("Fetching verification statistics for consultant ID: {}", consultantId);
        return verificationRepository.getVerificationStatistics(consultantId);
    }
}
