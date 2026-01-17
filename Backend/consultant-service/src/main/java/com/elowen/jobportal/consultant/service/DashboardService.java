package com.elowen.jobportal.consultant.service;

import com.elowen.jobportal.consultant.domain.entity.Pool;
import com.elowen.jobportal.consultant.dto.response.*;
import com.elowen.jobportal.consultant.repository.CandidateRepository;
import com.elowen.jobportal.consultant.repository.CandidateVerificationRepository;
import com.elowen.jobportal.consultant.repository.ConsultantRepository;
import com.elowen.jobportal.consultant.repository.PoolRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

/**
 * Service for dashboard metrics and analytics
 */
@Service
@RequiredArgsConstructor
@Slf4j
public class DashboardService {

    private final ConsultantRepository consultantRepository;
    private final PoolRepository poolRepository;
    private final CandidateRepository candidateRepository;
    private final CandidateVerificationRepository verificationRepository;
    private final ConsultantService consultantService;
    private final PoolService poolService;
    private final CandidateService candidateService;

    /**
     * Get overview metrics for dashboard home
     */
    @Transactional(readOnly = true)
    public DashboardOverviewResponse getOverviewMetrics(Long consultantId) {
        log.debug("Fetching overview metrics for consultant ID: {}", consultantId);
        
        // Verify consultant exists
        consultantService.getProfile(consultantId);
        
        Map<String, Object> poolMetrics = poolRepository.getPoolOverviewMetrics(consultantId);
        Map<String, Object> workforceMetrics = candidateRepository.getWorkforceMetrics(consultantId);
        Map<String, Object> verificationMetrics = verificationRepository.getVerificationStatistics(consultantId);
        
        return DashboardOverviewResponse.builder()
                .totalPools(getLongValue(poolMetrics, "totalPools"))
                .activePools(getLongValue(poolMetrics, "activePools"))
                .totalCandidates(getLongValue(workforceMetrics, "totalCandidates"))
                .activeCandidates(getLongValue(workforceMetrics, "activeCandidates"))
                .deployedCandidates(getLongValue(workforceMetrics, "deployedCandidates"))
                .pendingVerifications(getLongValue(verificationMetrics, "pendingCount"))
                .verifiedCandidates(getLongValue(verificationMetrics, "verifiedCount"))
                .totalCommissionEarned(getDecimalValue(poolMetrics, "totalCommission"))
                .build();
    }

    /**
     * Get workforce metrics for dashboard
     */
    @Transactional(readOnly = true)
    public WorkforceMetricsResponse getWorkforceMetrics(Long consultantId) {
        log.debug("Fetching workforce metrics for consultant ID: {}", consultantId);
        
        // Verify consultant exists
        consultantService.getProfile(consultantId);
        
        Map<String, Object> metrics = candidateRepository.getWorkforceMetrics(consultantId);
        
        // Count verified candidates separately
        long verifiedCount = candidateRepository.findByConsultantId(consultantId).stream()
                .filter(c -> c.getIsVerified())
                .count();
        
        return WorkforceMetricsResponse.builder()
                .totalCandidates(getLongValue(metrics, "totalWorkers"))
                .activeCandidates(getLongValue(metrics, "activeWorkers"))
                .inactiveCandidates(getLongValue(metrics, "inactiveWorkers"))
                .deployedCandidates(getLongValue(metrics, "deployedWorkers"))
                .verifiedCandidates(verifiedCount)
                .maleCount(0L) // Can be enhanced later
                .femaleCount(0L) // Can be enhanced later
                .build();
    }

    /**
     * Get pool performance metrics
     */
    @Transactional(readOnly = true)
    public PoolPerformanceResponse getPoolPerformanceMetrics(Long consultantId) {
        log.debug("Fetching pool performance metrics for consultant ID: {}", consultantId);
        
        // Verify consultant exists
        consultantService.getProfile(consultantId);
        
        Map<String, Object> metrics = poolRepository.getPoolOverviewMetrics(consultantId);
        List<PoolResponse> topPoolsResponse = poolService.getTopPoolsByCandidateCount(consultantId, 5);
        
        // Convert PoolResponse to PoolSummaryResponse
        List<PoolSummaryResponse> topPools = topPoolsResponse.stream()
                .map(pool -> PoolSummaryResponse.builder()
                        .id(pool.getId())
                        .poolName(pool.getName())
                        .totalCandidates(pool.getTotalCandidates())
                        .activeCandidates(pool.getActiveCandidates())
                        .totalCommissionEarned(pool.getCommissionEarned() != null ? BigDecimal.valueOf(pool.getCommissionEarned()) : BigDecimal.ZERO)
                        .status(pool.getStatus())
                        .build())
                .collect(Collectors.toList());
        
        return PoolPerformanceResponse.builder()
                .totalPools(getLongValue(metrics, "totalPools"))
                .activePools(getLongValue(metrics, "activePools"))
                .inactivePools(getLongValue(metrics, "inactivePools"))
                .totalCandidatesInPools(getLongValue(metrics, "totalCandidatesInPools"))
                .totalCommissionEarned(getDecimalValue(metrics, "totalCommission"))
                .topPerformingPools(topPools)
                .build();
    }

    /**
     * Get verification progress metrics
     */
    @Transactional(readOnly = true)
    public VerificationProgressResponse getVerificationProgress(Long consultantId) {
        log.debug("Fetching verification progress for consultant ID: {}", consultantId);
        
        // Verify consultant exists
        consultantService.getProfile(consultantId);
        
        Map<String, Object> statistics = verificationRepository.getVerificationStatistics(consultantId);
        
        return VerificationProgressResponse.builder()
                .totalVerifications(getLongValue(statistics, "totalCount"))
                .pendingVerifications(getLongValue(statistics, "pendingCount"))
                .underVerification(getLongValue(statistics, "underVerificationCount"))
                .verifiedCount(getLongValue(statistics, "verifiedCount"))
                .rejectedCount(getLongValue(statistics, "rejectedCount"))
                .completionPercentage(calculateCompletionPercentage(statistics))
                .build();
    }

    /**
     * Get recent activity summary
     */
    @Transactional(readOnly = true)
    public RecentActivityResponse getRecentActivity(Long consultantId) {
        log.debug("Fetching recent activity for consultant ID: {}", consultantId);
        
        // Verify consultant exists
        consultantService.getProfile(consultantId);
        
        // Recent candidates (last 10)
        List<CandidateResponse> recentCandidates = 
                candidateService.getRecentlyOnboarded(consultantId, 10);
        
        // Recent pools (last 5) - convert to summary response
        List<PoolResponse> recentPoolsResponse = poolService.getTopPoolsByCandidateCount(consultantId, 5);
        List<PoolSummaryResponse> recentPools = recentPoolsResponse.stream()
                .map(pool -> PoolSummaryResponse.builder()
                        .id(pool.getId())
                        .poolName(pool.getName())
                        .totalCandidates(pool.getTotalCandidates())
                        .activeCandidates(pool.getActiveCandidates())
                        .totalCommissionEarned(pool.getCommissionEarned() != null ? BigDecimal.valueOf(pool.getCommissionEarned()) : BigDecimal.ZERO)
                        .status(pool.getStatus())
                        .build())
                .collect(Collectors.toList());
        
        // Pending verifications count
        long pendingVerifications = verificationRepository
                .countPendingVerificationsByConsultantId(consultantId);
        
        return RecentActivityResponse.builder()
                .recentCandidates(recentCandidates)
                .recentPools(recentPools)
                .pendingVerificationsCount(pendingVerifications)
                .build();
    }

    /**
     * Get commission summary
     */
    @Transactional(readOnly = true)
    public CommissionSummaryResponse getCommissionSummary(Long consultantId) {
        log.debug("Fetching commission summary for consultant ID: {}", consultantId);
        
        // Verify consultant exists
        consultantService.getProfile(consultantId);
        
        Map<String, Object> poolMetrics = poolRepository.getPoolOverviewMetrics(consultantId);
        
        // Get top earning pools and convert to PoolSummaryResponse
        List<Pool> topEarningPools = 
                poolRepository.findTopPoolsByCandidateCount(consultantId, PageRequest.of(0, 5));
        
        List<PoolSummaryResponse> topEarningSummary = topEarningPools.stream()
                .map(pool -> PoolSummaryResponse.builder()
                        .id(pool.getId())
                        .poolName(pool.getName())
                        .totalCandidates(pool.getTotalCandidates())
                        .activeCandidates(pool.getActiveCandidates())
                        .totalCommissionEarned(pool.getCommissionEarned() != null ? BigDecimal.valueOf(pool.getCommissionEarned()) : BigDecimal.ZERO)
                        .status(pool.getStatus())
                        .build())
                .collect(Collectors.toList());
        
        return CommissionSummaryResponse.builder()
                .totalCommissionEarned(getDecimalValue(poolMetrics, "totalCommission"))
                .totalPools(getLongValue(poolMetrics, "totalPools"))
                .topEarningPools(topEarningSummary)
                .build();
    }

    /**
     * Get consultant performance metrics
     */
    @Transactional(readOnly = true)
    public ConsultantPerformanceResponse getConsultantPerformance(Long consultantId) {
        log.debug("Fetching consultant performance metrics for consultant ID: {}", consultantId);
        
        ConsultantProfileResponse consultant = consultantService.getProfile(consultantId);
        
        DashboardOverviewResponse overview = getOverviewMetrics(consultantId);
        
        // Calculate profile completeness percentage from boolean
        Integer profileCompleteness = consultant.getIsProfileComplete() != null && consultant.getIsProfileComplete() ? 100 : 50;
        
        return ConsultantPerformanceResponse.builder()
                .consultantName(consultant.getContactPersonName())
                .profileCompletenessPercentage(profileCompleteness)
                .totalPools(overview.getTotalPools())
                .totalCandidates(overview.getTotalCandidates())
                .deployedCandidates(overview.getDeployedCandidates())
                .totalCommissionEarned(overview.getTotalCommissionEarned())
                .successfulPlacements(overview.getDeployedCandidates()) // Assuming deployed = successful placements
                .verificationRate(calculateVerificationRate(overview))
                .build();
    }

    // Helper methods to safely extract values from maps
    
    private Long getLongValue(Map<String, Object> map, String key) {
        Object value = map.get(key);
        if (value == null) {
            return 0L;
        }
        if (value instanceof Long) {
            return (Long) value;
        }
        if (value instanceof Integer) {
            return ((Integer) value).longValue();
        }
        if (value instanceof BigDecimal) {
            return ((BigDecimal) value).longValue();
        }
        return 0L;
    }
    
    private BigDecimal getDecimalValue(Map<String, Object> map, String key) {
        Object value = map.get(key);
        if (value == null) {
            return BigDecimal.ZERO;
        }
        if (value instanceof BigDecimal) {
            return (BigDecimal) value;
        }
        if (value instanceof Double) {
            return BigDecimal.valueOf((Double) value);
        }
        if (value instanceof Integer) {
            return BigDecimal.valueOf((Integer) value);
        }
        return BigDecimal.ZERO;
    }
    
    private Double calculateCompletionPercentage(Map<String, Object> statistics) {
        Long total = getLongValue(statistics, "totalCount");
        Long verified = getLongValue(statistics, "verifiedCount");
        
        if (total == 0) {
            return 0.0;
        }
        
        return (verified.doubleValue() / total.doubleValue()) * 100.0;
    }
    
    private Double calculateVerificationRate(DashboardOverviewResponse overview) {
        if (overview.getTotalCandidates() == 0) {
            return 0.0;
        }
        
        return (overview.getVerifiedCandidates().doubleValue() / 
                overview.getTotalCandidates().doubleValue()) * 100.0;
    }
}
