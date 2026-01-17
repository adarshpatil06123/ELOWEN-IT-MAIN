package com.elowen.jobportal.consultant.controller;

import com.elowen.jobportal.consultant.dto.request.CreatePoolRequest;
import com.elowen.jobportal.consultant.dto.request.UpdatePoolRequest;
import com.elowen.jobportal.consultant.dto.response.PoolResponse;
import com.elowen.jobportal.consultant.service.PoolService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * REST Controller for pool management
 */
@RestController
@RequestMapping("/api/consultants/{consultantId}/pools")
@RequiredArgsConstructor
@Slf4j
public class PoolController {

    private final PoolService poolService;

    /**
     * Create new pool
     */
    @PostMapping
    public ResponseEntity<PoolResponse> createPool(
            @PathVariable Long consultantId,
            @Valid @RequestBody CreatePoolRequest request) {
        log.info("REST request to create pool for consultant ID: {}", consultantId);
        PoolResponse response = poolService.createPool(consultantId, request);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    /**
     * Get all pools for consultant
     */
    @GetMapping
    public ResponseEntity<List<PoolResponse>> getAllPools(@PathVariable Long consultantId) {
        log.info("REST request to get all pools for consultant ID: {}", consultantId);
        List<PoolResponse> response = poolService.getAllPools(consultantId);
        return ResponseEntity.ok(response);
    }

    /**
     * Get pool by ID
     */
    @GetMapping("/{poolId}")
    public ResponseEntity<PoolResponse> getPoolById(
            @PathVariable Long consultantId,
            @PathVariable Long poolId) {
        log.info("REST request to get pool ID: {} for consultant ID: {}", poolId, consultantId);
        PoolResponse response = poolService.getPoolById(consultantId, poolId);
        return ResponseEntity.ok(response);
    }

    /**
     * Update pool
     */
    @PutMapping("/{poolId}")
    public ResponseEntity<PoolResponse> updatePool(
            @PathVariable Long consultantId,
            @PathVariable Long poolId,
            @Valid @RequestBody UpdatePoolRequest request) {
        log.info("REST request to update pool ID: {} for consultant ID: {}", poolId, consultantId);
        PoolResponse response = poolService.updatePool(consultantId, poolId, request);
        return ResponseEntity.ok(response);
    }

    /**
     * Delete pool
     */
    @DeleteMapping("/{poolId}")
    public ResponseEntity<Void> deletePool(
            @PathVariable Long consultantId,
            @PathVariable Long poolId) {
        log.info("REST request to delete pool ID: {} for consultant ID: {}", poolId, consultantId);
        poolService.deletePool(consultantId, poolId);
        return ResponseEntity.noContent().build();
    }

    /**
     * Get active pools
     */
    @GetMapping("/active")
    public ResponseEntity<List<PoolResponse>> getActivePools(@PathVariable Long consultantId) {
        log.info("REST request to get active pools for consultant ID: {}", consultantId);
        List<PoolResponse> response = poolService.getActivePools(consultantId);
        return ResponseEntity.ok(response);
    }

    /**
     * Get top pools by candidate count
     */
    @GetMapping("/top")
    public ResponseEntity<List<PoolResponse>> getTopPools(
            @PathVariable Long consultantId,
            @RequestParam(defaultValue = "5") int limit) {
        log.info("REST request to get top {} pools for consultant ID: {}", limit, consultantId);
        List<PoolResponse> response = poolService.getTopPoolsByCandidateCount(consultantId, limit);
        return ResponseEntity.ok(response);
    }
}
