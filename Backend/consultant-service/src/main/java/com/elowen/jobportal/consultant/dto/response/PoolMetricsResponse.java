package com.elowen.jobportal.consultant.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * Response DTO for pool metrics
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PoolMetricsResponse {

    private Long poolId;
    private String poolName;
    private Integer workersInPool;
    private Integer activeJobs;
    private Double successRate;
    private Long commissionEarned;
    private Integer activeCandidates;
    private Integer inactiveCandidates;
    private Integer deployedCandidates;
}
