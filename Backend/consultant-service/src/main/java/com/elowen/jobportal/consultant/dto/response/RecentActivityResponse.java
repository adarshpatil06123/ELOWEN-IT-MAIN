package com.elowen.jobportal.consultant.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

/**
 * Recent activity summary for dashboard
 */
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class RecentActivityResponse {
    
    private List<CandidateResponse> recentCandidates;
    private List<PoolSummaryResponse> recentPools;
    private Long pendingVerificationsCount;
}
