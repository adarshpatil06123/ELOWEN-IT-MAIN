package com.elowen.jobportal.consultant.mapper;

import com.elowen.jobportal.consultant.domain.entity.Consultant;
import com.elowen.jobportal.consultant.domain.entity.Pool;
import com.elowen.jobportal.consultant.dto.request.CreatePoolRequest;
import com.elowen.jobportal.consultant.dto.request.UpdatePoolRequest;
import com.elowen.jobportal.consultant.dto.response.PoolMetricsResponse;
import com.elowen.jobportal.consultant.dto.response.PoolResponse;
import org.springframework.stereotype.Component;

/**
 * Mapper for Pool entity and DTOs
 */
@Component
public class PoolMapper {

    public PoolResponse toResponse(Pool pool) {
        if (pool == null) {
            return null;
        }

        return PoolResponse.builder()
                .id(pool.getId())
                .name(pool.getName())
                .skillCategory(pool.getSkillCategory())
                .description(pool.getDescription())
                .status(pool.getStatus())
                .totalCandidates(pool.getTotalCandidates())
                .activeCandidates(pool.getActiveCandidates())
                .inactiveCandidates(pool.getInactiveCandidates())
                .deployedCandidates(pool.getDeployedCandidates())
                .activeJobs(pool.getActiveJobs())
                .successRate(pool.getSuccessRate())
                .commissionEarned(pool.getCommissionEarned())
                .createdAt(pool.getCreatedAt())
                .updatedAt(pool.getUpdatedAt())
                .build();
    }

    public PoolMetricsResponse toMetricsResponse(Pool pool) {
        if (pool == null) {
            return null;
        }

        return PoolMetricsResponse.builder()
                .poolId(pool.getId())
                .poolName(pool.getName())
                .workersInPool(pool.getTotalCandidates())
                .activeJobs(pool.getActiveJobs())
                .successRate(pool.getSuccessRate())
                .commissionEarned(pool.getCommissionEarned())
                .activeCandidates(pool.getActiveCandidates())
                .inactiveCandidates(pool.getInactiveCandidates())
                .deployedCandidates(pool.getDeployedCandidates())
                .build();
    }

    public Pool toEntity(CreatePoolRequest request, Consultant consultant) {
        return Pool.builder()
                .consultant(consultant)
                .name(request.getName())
                .skillCategory(request.getSkillCategory())
                .description(request.getDescription())
                .status(com.elowen.jobportal.consultant.domain.enums.PoolStatus.NEW)
                .totalCandidates(0)
                .activeCandidates(0)
                .inactiveCandidates(0)
                .deployedCandidates(0)
                .activeJobs(0)
                .successRate(0.0)
                .commissionEarned(0L)
                .build();
    }

    public void updateEntityFromRequest(Pool pool, UpdatePoolRequest request) {
        if (request.getName() != null) {
            pool.setName(request.getName());
        }
        if (request.getSkillCategory() != null) {
            pool.setSkillCategory(request.getSkillCategory());
        }
        if (request.getDescription() != null) {
            pool.setDescription(request.getDescription());
        }
        if (request.getStatus() != null) {
            pool.setStatus(request.getStatus());
        }
    }
}
