package com.elowen.jobportal.consultant.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.util.List;

/**
 * Pool performance metrics for dashboard
 */
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class PoolPerformanceResponse {
    
    private Long totalPools;
    private Long activePools;
    private Long inactivePools;
    private Long totalCandidatesInPools;
    private BigDecimal totalCommissionEarned;
    private List<PoolSummaryResponse> topPerformingPools;
}
