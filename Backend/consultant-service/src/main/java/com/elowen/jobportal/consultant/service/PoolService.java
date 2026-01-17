package com.elowen.jobportal.consultant.service;

import com.elowen.jobportal.consultant.domain.entity.Consultant;
import com.elowen.jobportal.consultant.domain.entity.Pool;
import com.elowen.jobportal.consultant.domain.enums.PoolStatus;
import com.elowen.jobportal.consultant.dto.request.CreatePoolRequest;
import com.elowen.jobportal.consultant.dto.request.UpdatePoolRequest;
import com.elowen.jobportal.consultant.dto.response.PoolMetricsResponse;
import com.elowen.jobportal.consultant.dto.response.PoolResponse;
import com.elowen.jobportal.consultant.exception.BusinessException;
import com.elowen.jobportal.consultant.exception.ResourceNotFoundException;
import com.elowen.jobportal.consultant.mapper.PoolMapper;
import com.elowen.jobportal.consultant.repository.PoolRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

/**
 * Service for pool management
 */
@Service
@RequiredArgsConstructor
@Slf4j
public class PoolService {

    private final PoolRepository poolRepository;
    private final ConsultantService consultantService;
    private final PoolMapper poolMapper;

    /**
     * Create a new pool
     */
    @Transactional
    public PoolResponse createPool(Long consultantId, CreatePoolRequest request) {
        log.info("Creating new pool '{}' for consultant ID: {}", request.getName(), consultantId);
        
        Consultant consultant = consultantService.getConsultantById(consultantId);
        
        // Check if pool with same name already exists
        poolRepository.findByConsultantIdAndName(consultantId, request.getName())
                .ifPresent(existing -> {
                    throw new BusinessException("Pool with name '" + request.getName() + "' already exists");
                });
        
        Pool pool = poolMapper.toEntity(request, consultant);
        Pool savedPool = poolRepository.save(pool);
        
        log.info("Pool created successfully with ID: {}", savedPool.getId());
        return poolMapper.toResponse(savedPool);
    }

    /**
     * Get all pools for a consultant
     */
    @Transactional(readOnly = true)
    public List<PoolResponse> getAllPools(Long consultantId) {
        log.debug("Fetching all pools for consultant ID: {}", consultantId);
        
        List<Pool> pools = poolRepository.findByConsultantId(consultantId);
        return pools.stream()
                .map(poolMapper::toResponse)
                .collect(Collectors.toList());
    }

    /**
     * Get active pools for a consultant
     */
    @Transactional(readOnly = true)
    public List<PoolResponse> getActivePools(Long consultantId) {
        log.debug("Fetching active pools for consultant ID: {}", consultantId);
        
        List<Pool> pools = poolRepository.findActivePoolsByConsultantId(consultantId);
        return pools.stream()
                .map(poolMapper::toResponse)
                .collect(Collectors.toList());
    }

    /**
     * Get pool by ID
     */
    @Transactional(readOnly = true)
    public PoolResponse getPoolById(Long consultantId, Long poolId) {
        log.debug("Fetching pool ID: {} for consultant ID: {}", poolId, consultantId);
        
        Pool pool = poolRepository.findByIdAndConsultantId(poolId, consultantId)
                .orElseThrow(() -> new ResourceNotFoundException("Pool", poolId));
        
        return poolMapper.toResponse(pool);
    }

    /**
     * Get pool entity by ID (internal use)
     */
    @Transactional(readOnly = true)
    public Pool getPoolEntityById(Long consultantId, Long poolId) {
        return poolRepository.findByIdAndConsultantId(poolId, consultantId)
                .orElseThrow(() -> new ResourceNotFoundException("Pool", poolId));
    }

    /**
     * Update pool
     */
    @Transactional
    public PoolResponse updatePool(Long consultantId, Long poolId, UpdatePoolRequest request) {
        log.info("Updating pool ID: {}", poolId);
        
        Pool pool = getPoolEntityById(consultantId, poolId);
        
        // If name is being changed, check for duplicates
        if (request.getName() != null && !request.getName().equals(pool.getName())) {
            poolRepository.findByConsultantIdAndName(consultantId, request.getName())
                    .ifPresent(existing -> {
                        throw new BusinessException("Pool with name '" + request.getName() + "' already exists");
                    });
        }
        
        poolMapper.updateEntityFromRequest(pool, request);
        Pool savedPool = poolRepository.save(pool);
        
        log.info("Pool updated successfully");
        return poolMapper.toResponse(savedPool);
    }

    /**
     * Delete pool
     */
    @Transactional
    public void deletePool(Long consultantId, Long poolId) {
        log.info("Deleting pool ID: {}", poolId);
        
        Pool pool = getPoolEntityById(consultantId, poolId);
        
        // Check if pool has candidates
        if (pool.getTotalCandidates() > 0) {
            throw new BusinessException("Cannot delete pool with existing candidates. Please remove all candidates first.");
        }
        
        poolRepository.delete(pool);
        log.info("Pool deleted successfully");
    }

    /**
     * Get pool metrics
     */
    @Transactional(readOnly = true)
    public PoolMetricsResponse getPoolMetrics(Long consultantId, Long poolId) {
        log.debug("Fetching metrics for pool ID: {}", poolId);
        
        Pool pool = getPoolEntityById(consultantId, poolId);
        return poolMapper.toMetricsResponse(pool);
    }

    /**
     * Update pool metrics (called when candidates are added/removed/updated)
     */
    @Transactional
    public void updatePoolMetrics(Long poolId) {
        log.debug("Updating metrics for pool ID: {}", poolId);
        
        Pool pool = poolRepository.findById(poolId)
                .orElseThrow(() -> new ResourceNotFoundException("Pool", poolId));
        
        pool.updateMetrics();
        poolRepository.save(pool);
    }

    /**
     * Get pools by skill category
     */
    @Transactional(readOnly = true)
    public List<PoolResponse> getPoolsBySkillCategory(Long consultantId, String skillCategory) {
        log.debug("Fetching pools by skill category: {}", skillCategory);
        
        List<Pool> pools = poolRepository.findByConsultantIdAndSkillCategory(consultantId, skillCategory);
        return pools.stream()
                .map(poolMapper::toResponse)
                .collect(Collectors.toList());
    }

    /**
     * Get top pools by candidate count
     */
    @Transactional(readOnly = true)
    public List<PoolResponse> getTopPoolsByCandidateCount(Long consultantId, int limit) {
        log.debug("Fetching top {} pools by candidate count", limit);
        
        List<Pool> pools = poolRepository.findTopPoolsByCandidateCount(consultantId, PageRequest.of(0, limit));
        return pools.stream()
                .map(poolMapper::toResponse)
                .collect(Collectors.toList());
    }

    /**
     * Get total candidates count across all pools
     */
    @Transactional(readOnly = true)
    public Long getTotalCandidatesCount(Long consultantId) {
        return poolRepository.getTotalCandidatesCount(consultantId);
    }

    /**
     * Get total active candidates count
     */
    @Transactional(readOnly = true)
    public Long getTotalActiveCandidatesCount(Long consultantId) {
        return poolRepository.getTotalActiveCandidatesCount(consultantId);
    }

    /**
     * Update pool commission
     */
    @Transactional
    public void updatePoolCommission(Long poolId, Long commissionAmount) {
        log.debug("Updating commission for pool ID: {} by {}", poolId, commissionAmount);
        
        Pool pool = poolRepository.findById(poolId)
                .orElseThrow(() -> new ResourceNotFoundException("Pool", poolId));
        
        pool.setCommissionEarned(pool.getCommissionEarned() + commissionAmount);
        poolRepository.save(pool);
    }

    /**
     * Update pool active jobs count
     */
    @Transactional
    public void updateActiveJobsCount(Long poolId, int activeJobs) {
        log.debug("Updating active jobs count for pool ID: {} to {}", poolId, activeJobs);
        
        Pool pool = poolRepository.findById(poolId)
                .orElseThrow(() -> new ResourceNotFoundException("Pool", poolId));
        
        pool.setActiveJobs(activeJobs);
        poolRepository.save(pool);
    }
}
