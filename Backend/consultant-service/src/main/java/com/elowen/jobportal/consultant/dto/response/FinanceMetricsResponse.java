package com.elowen.jobportal.consultant.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * Response DTO for finance metrics dashboard section
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class FinanceMetricsResponse {

    private Long totalCommission;
    private Long commissionEarned;
    private Long pendingCommission;
}
