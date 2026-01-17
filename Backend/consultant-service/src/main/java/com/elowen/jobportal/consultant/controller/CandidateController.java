package com.elowen.jobportal.consultant.controller;

import com.elowen.jobportal.consultant.domain.enums.CandidateAvailability;
import com.elowen.jobportal.consultant.dto.request.CreateCandidateRequest;
import com.elowen.jobportal.consultant.dto.request.UpdateCandidateRequest;
import com.elowen.jobportal.consultant.dto.response.CandidateResponse;
import com.elowen.jobportal.consultant.service.CandidateService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * REST Controller for candidate management
 */
@RestController
@RequestMapping("/api/consultants/{consultantId}")
@RequiredArgsConstructor
@Slf4j
public class CandidateController {

    private final CandidateService candidateService;

    /**
     * Add candidate to pool
     */
    @PostMapping("/pools/{poolId}/candidates")
    public ResponseEntity<CandidateResponse> addCandidate(
            @PathVariable Long consultantId,
            @PathVariable Long poolId,
            @Valid @RequestBody CreateCandidateRequest request) {
        log.info("REST request to add candidate to pool ID: {} for consultant ID: {}", poolId, consultantId);
        CandidateResponse response = candidateService.addCandidate(consultantId, poolId, request);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    /**
     * Get all candidates by pool
     */
    @GetMapping("/pools/{poolId}/candidates")
    public ResponseEntity<List<CandidateResponse>> getCandidatesByPool(
            @PathVariable Long consultantId,
            @PathVariable Long poolId) {
        log.info("REST request to get candidates for pool ID: {} and consultant ID: {}", poolId, consultantId);
        List<CandidateResponse> response = candidateService.getCandidatesByPool(consultantId, poolId);
        return ResponseEntity.ok(response);
    }

    /**
     * Get candidate by ID
     */
    @GetMapping("/candidates/{candidateId}")
    public ResponseEntity<CandidateResponse> getCandidateById(
            @PathVariable Long consultantId,
            @PathVariable Long candidateId) {
        log.info("REST request to get candidate ID: {} for consultant ID: {}", candidateId, consultantId);
        CandidateResponse response = candidateService.getCandidateById(consultantId, candidateId);
        return ResponseEntity.ok(response);
    }

    /**
     * Update candidate
     */
    @PutMapping("/candidates/{candidateId}")
    public ResponseEntity<CandidateResponse> updateCandidate(
            @PathVariable Long consultantId,
            @PathVariable Long candidateId,
            @Valid @RequestBody UpdateCandidateRequest request) {
        log.info("REST request to update candidate ID: {} for consultant ID: {}", candidateId, consultantId);
        CandidateResponse response = candidateService.updateCandidate(consultantId, candidateId, request);
        return ResponseEntity.ok(response);
    }

    /**
     * Delete candidate
     */
    @DeleteMapping("/candidates/{candidateId}")
    public ResponseEntity<Void> deleteCandidate(
            @PathVariable Long consultantId,
            @PathVariable Long candidateId) {
        log.info("REST request to delete candidate ID: {} for consultant ID: {}", candidateId, consultantId);
        candidateService.deleteCandidate(consultantId, candidateId);
        return ResponseEntity.noContent().build();
    }

    /**
     * Update candidate availability
     */
    @PatchMapping("/candidates/{candidateId}/availability")
    public ResponseEntity<CandidateResponse> updateAvailability(
            @PathVariable Long consultantId,
            @PathVariable Long candidateId,
            @RequestParam CandidateAvailability availability) {
        log.info("REST request to update availability for candidate ID: {} to {}", candidateId, availability);
        CandidateResponse response = candidateService.updateCandidateAvailability(consultantId, candidateId, availability);
        return ResponseEntity.ok(response);
    }

    /**
     * Get candidates by availability
     */
    @GetMapping("/pools/{poolId}/candidates/availability/{availability}")
    public ResponseEntity<List<CandidateResponse>> getCandidatesByAvailability(
            @PathVariable Long consultantId,
            @PathVariable Long poolId,
            @PathVariable CandidateAvailability availability) {
        log.info("REST request to get {} candidates for pool ID: {}", availability, poolId);
        List<CandidateResponse> response = candidateService.getCandidatesByAvailability(consultantId, poolId, availability);
        return ResponseEntity.ok(response);
    }

    /**
     * Search candidates by name
     */
    @GetMapping("/pools/{poolId}/candidates/search")
    public ResponseEntity<List<CandidateResponse>> searchCandidates(
            @PathVariable Long consultantId,
            @PathVariable Long poolId,
            @RequestParam String searchTerm) {
        log.info("REST request to search candidates with term: {} in pool ID: {}", searchTerm, poolId);
        List<CandidateResponse> response = candidateService.searchCandidatesByName(consultantId, poolId, searchTerm);
        return ResponseEntity.ok(response);
    }

    /**
     * Get recently onboarded candidates
     */
    @GetMapping("/candidates/recent")
    public ResponseEntity<List<CandidateResponse>> getRecentlyOnboarded(
            @PathVariable Long consultantId,
            @RequestParam(defaultValue = "10") int limit) {
        log.info("REST request to get recently onboarded candidates for consultant ID: {}", consultantId);
        List<CandidateResponse> response = candidateService.getRecentlyOnboarded(consultantId, limit);
        return ResponseEntity.ok(response);
    }

    /**
     * Get all candidates for consultant
     */
    @GetMapping("/candidates")
    public ResponseEntity<List<CandidateResponse>> getAllCandidates(@PathVariable Long consultantId) {
        log.info("REST request to get all candidates for consultant ID: {}", consultantId);
        List<CandidateResponse> response = candidateService.getAllCandidates(consultantId);
        return ResponseEntity.ok(response);
    }

    /**
     * Deploy candidate to job
     */
    @PostMapping("/candidates/{candidateId}/deploy")
    public ResponseEntity<Void> deployCandidate(
            @PathVariable Long consultantId,
            @PathVariable Long candidateId,
            @RequestParam Long jobId,
            @RequestParam Long employerId) {
        log.info("REST request to deploy candidate ID: {} to job ID: {}", candidateId, jobId);
        candidateService.deployCandidateToJob(consultantId, candidateId, jobId, employerId);
        return ResponseEntity.ok().build();
    }
}
