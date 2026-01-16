package com.elowen.jobportal.application.controller;

import com.elowen.jobportal.application.dto.ApplicationRequest;
import com.elowen.jobportal.application.dto.ApplicationResponse;
import com.elowen.jobportal.application.service.ApplicationService;
import com.elowen.jobportal.contracts.constants.HeaderConstants;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@Slf4j
@RestController
@RequestMapping("/applications")
@RequiredArgsConstructor
public class ApplicationController {

    private final ApplicationService applicationService;

    @PostMapping
    public ResponseEntity<ApplicationResponse> submitApplication(
            @RequestHeader(HeaderConstants.USER_ID) Long userId,
            @Valid @RequestBody ApplicationRequest request) {
        log.info("Submit application request from user: {} for job: {}", userId, request.getJobId());
        ApplicationResponse response = applicationService.submitApplication(userId, request);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @GetMapping("/my-applications")
    public ResponseEntity<Page<ApplicationResponse>> getMyApplications(
            @RequestHeader(HeaderConstants.USER_ID) Long userId,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "20") int size) {
        log.info("Get my applications for user: {}", userId);
        Page<ApplicationResponse> applications = applicationService.getMyApplications(userId, PageRequest.of(page, size));
        return ResponseEntity.ok(applications);
    }

    @GetMapping("/job/{jobId}")
    public ResponseEntity<Page<ApplicationResponse>> getJobApplications(
            @PathVariable Long jobId,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "20") int size) {
        log.info("Get applications for job: {}", jobId);
        Page<ApplicationResponse> applications = applicationService.getJobApplications(jobId, PageRequest.of(page, size));
        return ResponseEntity.ok(applications);
    }

    @PatchMapping("/{applicationId}/status")
    public ResponseEntity<ApplicationResponse> updateStatus(
            @PathVariable Long applicationId,
            @RequestParam String status) {
        log.info("Update application {} status to {}", applicationId, status);
        ApplicationResponse response = applicationService.updateStatus(applicationId, status);
        return ResponseEntity.ok(response);
    }
}
