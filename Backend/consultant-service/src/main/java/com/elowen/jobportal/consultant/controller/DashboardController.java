package com.elowen.jobportal.consultant.controller;

import com.elowen.jobportal.consultant.dto.response.*;
import com.elowen.jobportal.consultant.service.DashboardService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

/**
 * REST Controller for dashboard metrics and analytics
 */
@RestController
@RequestMapping("/api/consultants/{consultantId}/dashboard")
@RequiredArgsConstructor
@Slf4j
public class DashboardController {

    private final DashboardService dashboardService;

    /**
     * Get complete dashboard overview
     */
    @GetMapping("/overview")
    public ResponseEntity<DashboardOverviewResponse> getOverview(@PathVariable Long consultantId) {
        log.info("REST request to get dashboard overview for consultant ID: {}", consultantId);
        DashboardOverviewResponse response = dashboardService.getOverviewMetrics(consultantId);
        return ResponseEntity.ok(response);
    }

    /**
     * Get workforce metrics
     */
    @GetMapping("/workforce")
    public ResponseEntity<WorkforceMetricsResponse> getWorkforceMetrics(@PathVariable Long consultantId) {
        log.info("REST request to get workforce metrics for consultant ID: {}", consultantId);
        WorkforceMetricsResponse response = dashboardService.getWorkforceMetrics(consultantId);
        return ResponseEntity.ok(response);
    }

    /**
     * Get pool performance metrics
     */
    @GetMapping("/pool-performance")
    public ResponseEntity<PoolPerformanceResponse> getPoolPerformance(@PathVariable Long consultantId) {
        log.info("REST request to get pool performance for consultant ID: {}", consultantId);
        PoolPerformanceResponse response = dashboardService.getPoolPerformanceMetrics(consultantId);
        return ResponseEntity.ok(response);
    }

    /**
     * Get verification progress
     */
    @GetMapping("/verification-progress")
    public ResponseEntity<VerificationProgressResponse> getVerificationProgress(@PathVariable Long consultantId) {
        log.info("REST request to get verification progress for consultant ID: {}", consultantId);
        VerificationProgressResponse response = dashboardService.getVerificationProgress(consultantId);
        return ResponseEntity.ok(response);
    }

    /**
     * Get recent activity
     */
    @GetMapping("/recent-activity")
    public ResponseEntity<RecentActivityResponse> getRecentActivity(@PathVariable Long consultantId) {
        log.info("REST request to get recent activity for consultant ID: {}", consultantId);
        RecentActivityResponse response = dashboardService.getRecentActivity(consultantId);
        return ResponseEntity.ok(response);
    }

    /**
     * Get commission summary
     */
    @GetMapping("/commission")
    public ResponseEntity<CommissionSummaryResponse> getCommissionSummary(@PathVariable Long consultantId) {
        log.info("REST request to get commission summary for consultant ID: {}", consultantId);
        CommissionSummaryResponse response = dashboardService.getCommissionSummary(consultantId);
        return ResponseEntity.ok(response);
    }

    /**
     * Get consultant performance
     */
    @GetMapping("/performance")
    public ResponseEntity<ConsultantPerformanceResponse> getConsultantPerformance(@PathVariable Long consultantId) {
        log.info("REST request to get consultant performance for consultant ID: {}", consultantId);
        ConsultantPerformanceResponse response = dashboardService.getConsultantPerformance(consultantId);
        return ResponseEntity.ok(response);
    }
}
