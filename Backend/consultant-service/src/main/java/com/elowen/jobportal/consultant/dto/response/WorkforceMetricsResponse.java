package com.elowen.jobportal.consultant.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * Workforce metrics for dashboard
 */
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class WorkforceMetricsResponse {
    
    private Long totalCandidates;
    private Long activeCandidates;
    private Long inactiveCandidates;
    private Long deployedCandidates;
    private Long verifiedCandidates;
    private Long maleCount;
    private Long femaleCount;
}
