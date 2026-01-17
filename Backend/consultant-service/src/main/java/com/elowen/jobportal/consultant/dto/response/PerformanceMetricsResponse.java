package com.elowen.jobportal.consultant.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * Response DTO for performance metrics dashboard section
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PerformanceMetricsResponse {

    private Integer pastPlacements;
    private Double successRate;
    private Long incentives;
    private Double ratings;
}
