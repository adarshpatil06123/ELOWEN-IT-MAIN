package com.elowen.jobportal.consultant.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * Response DTO for pool overview dashboard section
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PoolOverviewResponse {

    private Integer workersInPool;
    private Integer activeJobs;
    private Double successRate;
    private Long commissionEarned;
}
