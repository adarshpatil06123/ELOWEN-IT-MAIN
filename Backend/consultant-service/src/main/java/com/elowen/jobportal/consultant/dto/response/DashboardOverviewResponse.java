package com.elowen.jobportal.consultant.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

/**
 * Dashboard overview metrics response
 */
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class DashboardOverviewResponse {
    
    private Long totalPools;
    private Long activePools;
    private Long totalCandidates;
    private Long activeCandidates;
    private Long deployedCandidates;
    private Long pendingVerifications;
    private Long verifiedCandidates;
    private BigDecimal totalCommissionEarned;
}
