package com.elowen.jobportal.consultant.dto.response;

import com.elowen.jobportal.consultant.domain.enums.PoolStatus;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

/**
 * Response DTO for pool
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PoolResponse {

    private Long id;
    private String name;
    private String skillCategory;
    private String description;
    private PoolStatus status;
    private Integer totalCandidates;
    private Integer activeCandidates;
    private Integer inactiveCandidates;
    private Integer deployedCandidates;
    private Integer activeJobs;
    private Double successRate;
    private Long commissionEarned;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
