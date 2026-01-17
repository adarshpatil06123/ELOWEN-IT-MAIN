package com.elowen.jobportal.consultant.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.util.List;

/**
 * Commission summary for dashboard
 */
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CommissionSummaryResponse {
    
    private BigDecimal totalCommissionEarned;
    private Long totalPools;
    private List<PoolSummaryResponse> topEarningPools;
}
