package com.elowen.jobportal.consultant.controller;

import com.elowen.jobportal.consultant.domain.entity.Consultant;
import com.elowen.jobportal.consultant.dto.request.UpdateConsultantProfileRequest;
import com.elowen.jobportal.consultant.dto.request.UpdateSpecializationsRequest;
import com.elowen.jobportal.consultant.dto.response.ConsultantProfileResponse;
import com.elowen.jobportal.consultant.dto.response.DashboardOverviewResponse;
import com.elowen.jobportal.consultant.service.ConsultantService;
import com.elowen.jobportal.consultant.service.DashboardService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

/**
 * REST Controller for consultant profile management
 */
@RestController
@RequestMapping("/api/consultants")
@RequiredArgsConstructor
@Slf4j
public class ConsultantController {

    private final ConsultantService consultantService;
    private final DashboardService dashboardService;

    /**
     * Get consultant profile
     */
    @GetMapping("/{consultantId}/profile")
    public ResponseEntity<ConsultantProfileResponse> getProfile(
            @PathVariable Long consultantId) {
        log.info("REST request to get profile for consultant ID: {}", consultantId);
        ConsultantProfileResponse response = consultantService.getProfile(consultantId);
        return ResponseEntity.ok(response);
    }

    /**
     * Update consultant profile for currently authenticated user
     */
    @PutMapping("/profile")
    public ResponseEntity<ConsultantProfileResponse> updateMyProfile(
            Authentication authentication,
            @Valid @RequestBody UpdateConsultantProfileRequest request) {
        Long userId = (Long) authentication.getPrincipal();
        log.info("REST request to update profile for user ID: {}", userId);
        ConsultantProfileResponse response = consultantService.updateProfileByUserId(userId, request);
        return ResponseEntity.ok(response);
    }

    /**
     * Get my consultant profile (authenticated user)
     */
    @GetMapping("/profile")
    public ResponseEntity<ConsultantProfileResponse> getMyProfile(Authentication authentication) {
        Long userId = (Long) authentication.getPrincipal();
        log.info("REST request to get profile for user ID: {}", userId);
        ConsultantProfileResponse response = consultantService.getProfileByUserId(userId);
        return ResponseEntity.ok(response);
    }

    /**
     * Update consultant profile
     */
    @PutMapping("/{consultantId}/profile")
    public ResponseEntity<ConsultantProfileResponse> updateProfile(
            @PathVariable Long consultantId,
            @Valid @RequestBody UpdateConsultantProfileRequest request) {
        log.info("REST request to update profile for consultant ID: {}", consultantId);
        ConsultantProfileResponse response = consultantService.updateProfile(consultantId, request);
        return ResponseEntity.ok(response);
    }

    /**
     * Update consultant specializations for currently authenticated user
     */
    @PutMapping("/specializations")
    public ResponseEntity<ConsultantProfileResponse> updateMySpecializations(
            Authentication authentication,
            @Valid @RequestBody UpdateSpecializationsRequest request) {
        Long userId = (Long) authentication.getPrincipal();
        log.info("REST request to update specializations for user ID: {}", userId);
        Consultant consultant = consultantService.getConsultantByUserId(userId);
        ConsultantProfileResponse response = consultantService.updateSpecializations(consultant.getId(), request);
        return ResponseEntity.ok(response);
    }

    /**
     * Update consultant specializations
     */
    @PutMapping("/{consultantId}/specializations")
    public ResponseEntity<ConsultantProfileResponse> updateSpecializations(
            @PathVariable Long consultantId,
            @Valid @RequestBody UpdateSpecializationsRequest request) {
        log.info("REST request to update specializations for consultant ID: {}", consultantId);
        ConsultantProfileResponse response = consultantService.updateSpecializations(consultantId, request);
        return ResponseEntity.ok(response);
    }

    /**
     * Create consultant profile (called by auth service after registration)
     */
    @PostMapping
    public ResponseEntity<ConsultantProfileResponse> createConsultant(
            @RequestParam Long userId,
            @RequestParam String email,
            @RequestParam String phoneNumber) {
        log.info("REST request to create consultant for user ID: {}", userId);
        ConsultantProfileResponse response = consultantService.createConsultant(userId, email, phoneNumber);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    /**
     * Get profile completeness percentage
     */
    @GetMapping("/{consultantId}/profile/completeness")
    public ResponseEntity<Integer> getProfileCompleteness(@PathVariable Long consultantId) {
        log.info("REST request to get profile completeness for consultant ID: {}", consultantId);
        ConsultantProfileResponse profile = consultantService.getProfile(consultantId);
        Integer completeness = profile.getIsProfileComplete() != null && profile.getIsProfileComplete() ? 100 : 50;
        return ResponseEntity.ok(completeness);
    }

    /**
     * Check if consultant exists by user ID
     */
    @GetMapping("/user/{userId}/exists")
    public ResponseEntity<Boolean> existsByUserId(@PathVariable Long userId) {
        log.debug("REST request to check if consultant exists for user ID: {}", userId);
        boolean exists = consultantService.existsByUserId(userId);
        return ResponseEntity.ok(exists);
    }

    /**
     * Get consultant by user ID
     */
    @GetMapping("/user/{userId}")
    public ResponseEntity<ConsultantProfileResponse> getByUserId(@PathVariable Long userId) {
        log.info("REST request to get consultant by user ID: {}", userId);
        ConsultantProfileResponse response = consultantService.getProfileByUserId(userId);
        return ResponseEntity.ok(response);
    }

    /**
     * Get dashboard overview for currently authenticated user
     */
    @GetMapping("/dashboard")
    public ResponseEntity<DashboardOverviewResponse> getDashboard(Authentication authentication) {
        Long userId = (Long) authentication.getPrincipal();
        log.info("REST request to get dashboard for user ID: {}", userId);
        Consultant consultant = consultantService.getConsultantByUserId(userId);
        DashboardOverviewResponse response = dashboardService.getOverviewMetrics(consultant.getId());
        return ResponseEntity.ok(response);
    }
}
