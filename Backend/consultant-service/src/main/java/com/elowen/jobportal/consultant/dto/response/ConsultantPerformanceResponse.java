package com.elowen.jobportal.consultant.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

/**
 * Consultant performance metrics for dashboard
 */
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ConsultantPerformanceResponse {
    
    private String consultantName;
    private Integer profileCompletenessPercentage;
    private Long totalPools;
    private Long totalCandidates;
    private Long deployedCandidates;
    private BigDecimal totalCommissionEarned;
    private Long successfulPlacements;
    private Double verificationRate;
}
