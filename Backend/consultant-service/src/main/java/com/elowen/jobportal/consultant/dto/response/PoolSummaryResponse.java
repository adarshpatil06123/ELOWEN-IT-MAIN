package com.elowen.jobportal.consultant.dto.response;

import com.elowen.jobportal.consultant.domain.enums.PoolStatus;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

/**
 * Summary response for pool information
 */
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class PoolSummaryResponse {
    
    private Long id;
    private String poolName;
    private Integer totalCandidates;
    private Integer activeCandidates;
    private BigDecimal totalCommissionEarned;
    private PoolStatus status;
}
