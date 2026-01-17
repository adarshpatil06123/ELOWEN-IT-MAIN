package com.elowen.jobportal.consultant.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

/**
 * Response DTO for complete consultant dashboard
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class DashboardResponse {

    private PoolOverviewResponse poolOverview;
    private WorkforceMetricsResponse workforceMetrics;
    private PerformanceMetricsResponse performanceMetrics;
    private FinanceMetricsResponse financeMetrics;
    private List<RecentlyOnboardedResponse> recentlyOnboarded;
}
