package com.elowen.jobportal.consultant.controller;

import com.elowen.jobportal.consultant.domain.enums.VerificationStatus;
import com.elowen.jobportal.consultant.dto.request.UpdateVerificationRequest;
import com.elowen.jobportal.consultant.dto.response.VerificationResponse;
import com.elowen.jobportal.consultant.service.VerificationService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

/**
 * REST Controller for candidate verification management
 */
@RestController
@RequestMapping("/api/consultants/{consultantId}/verifications")
@RequiredArgsConstructor
@Slf4j
public class VerificationController {

    private final VerificationService verificationService;

    /**
     * Get verification by candidate ID
     */
    @GetMapping("/candidate/{candidateId}")
    public ResponseEntity<VerificationResponse> getVerificationByCandidateId(
            @PathVariable Long consultantId,
            @PathVariable Long candidateId) {
        log.info("REST request to get verification for candidate ID: {}", candidateId);
        VerificationResponse response = verificationService.getVerificationByCandidateId(consultantId, candidateId);
        return ResponseEntity.ok(response);
    }

    /**
     * Update verification details
     */
    @PutMapping("/candidate/{candidateId}")
    public ResponseEntity<VerificationResponse> updateVerification(
            @PathVariable Long consultantId,
            @PathVariable Long candidateId,
            @Valid @RequestBody UpdateVerificationRequest request,
            @RequestParam(required = false) String verifiedBy) {
        log.info("REST request to update verification for candidate ID: {}", candidateId);
        VerificationResponse response = verificationService.updateVerification(
                consultantId, candidateId, request, verifiedBy != null ? verifiedBy : "System");
        return ResponseEntity.ok(response);
    }

    /**
     * Get all pending verifications
     */
    @GetMapping("/pending")
    public ResponseEntity<List<VerificationResponse>> getPendingVerifications(@PathVariable Long consultantId) {
        log.info("REST request to get pending verifications for consultant ID: {}", consultantId);
        List<VerificationResponse> response = verificationService.getPendingVerifications(consultantId);
        return ResponseEntity.ok(response);
    }

    /**
     * Get verifications by status
     */
    @GetMapping("/status/{status}")
    public ResponseEntity<List<VerificationResponse>> getVerificationsByStatus(
            @PathVariable Long consultantId,
            @PathVariable VerificationStatus status) {
        log.info("REST request to get {} verifications for consultant ID: {}", status, consultantId);
        List<VerificationResponse> response = verificationService.getVerificationsByStatus(consultantId, status);
        return ResponseEntity.ok(response);
    }

    /**
     * Get candidates requiring police verification
     */
    @GetMapping("/police-verification-required")
    public ResponseEntity<List<VerificationResponse>> getCandidatesRequiringPoliceVerification(
            @PathVariable Long consultantId) {
        log.info("REST request to get candidates requiring police verification");
        List<VerificationResponse> response = verificationService.getCandidatesRequiringPoliceVerification(consultantId);
        return ResponseEntity.ok(response);
    }

    /**
     * Get candidates requiring health check
     */
    @GetMapping("/health-check-required")
    public ResponseEntity<List<VerificationResponse>> getCandidatesRequiringHealthCheck(
            @PathVariable Long consultantId) {
        log.info("REST request to get candidates requiring health check");
        List<VerificationResponse> response = verificationService.getCandidatesRequiringHealthCheck(consultantId);
        return ResponseEntity.ok(response);
    }

    /**
     * Reject candidate verification
     */
    @PostMapping("/candidate/{candidateId}/reject")
    public ResponseEntity<VerificationResponse> rejectVerification(
            @PathVariable Long consultantId,
            @PathVariable Long candidateId,
            @RequestParam String rejectionReason,
            @RequestParam(required = false) String rejectedBy) {
        log.info("REST request to reject verification for candidate ID: {}", candidateId);
        VerificationResponse response = verificationService.rejectVerification(
                consultantId, candidateId, rejectionReason, rejectedBy != null ? rejectedBy : "System");
        return ResponseEntity.ok(response);
    }

    /**
     * Get verification statistics
     */
    @GetMapping("/statistics")
    public ResponseEntity<Map<String, Object>> getVerificationStatistics(@PathVariable Long consultantId) {
        log.info("REST request to get verification statistics for consultant ID: {}", consultantId);
        Map<String, Object> statistics = verificationService.getVerificationStatistics(consultantId);
        return ResponseEntity.ok(statistics);
    }
}
