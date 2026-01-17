package com.elowen.jobportal.consultant.service;

import com.elowen.jobportal.consultant.domain.entity.Candidate;
import com.elowen.jobportal.consultant.domain.entity.CandidateVerification;
import com.elowen.jobportal.consultant.domain.entity.Pool;
import com.elowen.jobportal.consultant.domain.enums.CandidateAvailability;
import com.elowen.jobportal.consultant.dto.request.CreateCandidateRequest;
import com.elowen.jobportal.consultant.dto.request.UpdateCandidateRequest;
import com.elowen.jobportal.consultant.dto.response.CandidateResponse;
import com.elowen.jobportal.consultant.exception.BusinessException;
import com.elowen.jobportal.consultant.exception.ResourceNotFoundException;
import com.elowen.jobportal.consultant.mapper.CandidateMapper;
import com.elowen.jobportal.consultant.repository.CandidateRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

/**
 * Service for candidate management
 */
@Service
@RequiredArgsConstructor
@Slf4j
public class CandidateService {

    private final CandidateRepository candidateRepository;
    private final PoolService poolService;
    private final VerificationService verificationService;
    private final CandidateMapper candidateMapper;

    /**
     * Add candidate to pool
     */
    @Transactional
    public CandidateResponse addCandidate(Long consultantId, Long poolId, CreateCandidateRequest request) {
        log.info("Adding new candidate '{}' to pool ID: {}", request.getName(), poolId);
        
        Pool pool = poolService.getPoolEntityById(consultantId, poolId);
        
        // Check for duplicate phone number
        if (request.getPhoneNumber() != null) {
            candidateRepository.findByPhoneNumber(request.getPhoneNumber())
                    .ifPresent(existing -> {
                        throw new BusinessException("Candidate with phone number '" + request.getPhoneNumber() + "' already exists");
                    });
        }
        
        // Check for duplicate email
        if (request.getEmail() != null) {
            candidateRepository.findByEmail(request.getEmail())
                    .ifPresent(existing -> {
                        throw new BusinessException("Candidate with email '" + request.getEmail() + "' already exists");
                    });
        }
        
        Candidate candidate = candidateMapper.toEntity(request, pool);
        Candidate savedCandidate = candidateRepository.save(candidate);
        
        // Verification record can be created separately when needed
        // verificationService.initiateCandidateVerification(savedCandidate.getId());
        
        // Update pool metrics
        poolService.updatePoolMetrics(poolId);
        
        log.info("Candidate added successfully with ID: {}", savedCandidate.getId());
        return candidateMapper.toResponse(savedCandidate);
    }

    /**
     * Get candidates by pool
     */
    @Transactional(readOnly = true)
    public List<CandidateResponse> getCandidatesByPool(Long consultantId, Long poolId) {
        log.debug("Fetching candidates for pool ID: {}", poolId);
        
        // Verify pool ownership
        poolService.getPoolEntityById(consultantId, poolId);
        
        List<Candidate> candidates = candidateRepository.findByPoolId(poolId);
        return candidates.stream()
                .map(candidateMapper::toResponse)
                .collect(Collectors.toList());
    }

    /**
     * Get candidate by ID
     */
    @Transactional(readOnly = true)
    public CandidateResponse getCandidateById(Long consultantId, Long candidateId) {
        log.debug("Fetching candidate ID: {}", candidateId);
        
        Candidate candidate = candidateRepository.findByIdAndConsultantId(candidateId, consultantId)
                .orElseThrow(() -> new ResourceNotFoundException("Candidate", candidateId));
        
        return candidateMapper.toResponse(candidate);
    }

    /**
     * Get candidate entity by ID (internal use)
     */
    @Transactional(readOnly = true)
    public Candidate getCandidateEntityById(Long consultantId, Long candidateId) {
        return candidateRepository.findByIdAndConsultantId(candidateId, consultantId)
                .orElseThrow(() -> new ResourceNotFoundException("Candidate", candidateId));
    }

    /**
     * Update candidate
     */
    @Transactional
    public CandidateResponse updateCandidate(Long consultantId, Long candidateId, UpdateCandidateRequest request) {
        log.info("Updating candidate ID: {}", candidateId);
        
        Candidate candidate = getCandidateEntityById(consultantId, candidateId);
        Long poolId = candidate.getPool().getId();
        
        // Check for duplicate phone number if being updated
        if (request.getPhoneNumber() != null && !request.getPhoneNumber().equals(candidate.getPhoneNumber())) {
            candidateRepository.findByPhoneNumber(request.getPhoneNumber())
                    .ifPresent(existing -> {
                        if (!existing.getId().equals(candidateId)) {
                            throw new BusinessException("Candidate with phone number '" + request.getPhoneNumber() + "' already exists");
                        }
                    });
        }
        
        // Check for duplicate email if being updated
        if (request.getEmail() != null && !request.getEmail().equals(candidate.getEmail())) {
            candidateRepository.findByEmail(request.getEmail())
                    .ifPresent(existing -> {
                        if (!existing.getId().equals(candidateId)) {
                            throw new BusinessException("Candidate with email '" + request.getEmail() + "' already exists");
                        }
                    });
        }
        
        candidateMapper.updateEntityFromRequest(candidate, request);
        Candidate savedCandidate = candidateRepository.save(candidate);
        
        // Update pool metrics if availability changed
        if (request.getAvailability() != null) {
            poolService.updatePoolMetrics(poolId);
        }
        
        log.info("Candidate updated successfully");
        return candidateMapper.toResponse(savedCandidate);
    }

    /**
     * Update candidate availability status
     */
    @Transactional
    public CandidateResponse updateCandidateAvailability(Long consultantId, Long candidateId, 
                                                         CandidateAvailability availability) {
        log.info("Updating availability for candidate ID: {} to {}", candidateId, availability);
        
        Candidate candidate = getCandidateEntityById(consultantId, candidateId);
        Long poolId = candidate.getPool().getId();
        
        candidate.setAvailability(availability);
        
        // Update deployment info if being deployed
        if (availability == CandidateAvailability.DEPLOYED) {
            candidate.setDeployedAt(LocalDateTime.now());
        } else if (availability == CandidateAvailability.ACTIVE || 
                   availability == CandidateAvailability.INACTIVE) {
            candidate.setCurrentJobId(null);
            candidate.setCurrentEmployerId(null);
            candidate.setDeployedAt(null);
        }
        
        Candidate savedCandidate = candidateRepository.save(candidate);
        
        // Update pool metrics
        poolService.updatePoolMetrics(poolId);
        
        log.info("Candidate availability updated successfully");
        return candidateMapper.toResponse(savedCandidate);
    }

    /**
     * Delete candidate
     */
    @Transactional
    public void deleteCandidate(Long consultantId, Long candidateId) {
        log.info("Deleting candidate ID: {}", candidateId);
        
        Candidate candidate = getCandidateEntityById(consultantId, candidateId);
        Long poolId = candidate.getPool().getId();
        
        // Check if candidate is deployed
        if (candidate.getAvailability() == CandidateAvailability.DEPLOYED) {
            throw new BusinessException("Cannot delete a deployed candidate. Please mark as inactive first.");
        }
        
        candidateRepository.delete(candidate);
        
        // Update pool metrics
        poolService.updatePoolMetrics(poolId);
        
        log.info("Candidate deleted successfully");
    }

    /**
     * Get candidates by availability
     */
    @Transactional(readOnly = true)
    public List<CandidateResponse> getCandidatesByAvailability(Long consultantId, Long poolId, 
                                                               CandidateAvailability availability) {
        log.debug("Fetching {} candidates for pool ID: {}", availability, poolId);
        
        // Verify pool ownership
        poolService.getPoolEntityById(consultantId, poolId);
        
        List<Candidate> candidates = candidateRepository.findByPoolIdAndAvailability(poolId, availability);
        return candidates.stream()
                .map(candidateMapper::toResponse)
                .collect(Collectors.toList());
    }

    /**
     * Search candidates by name
     */
    @Transactional(readOnly = true)
    public List<CandidateResponse> searchCandidatesByName(Long consultantId, Long poolId, String searchTerm) {
        log.debug("Searching candidates by name, position, and skills: {}", searchTerm);
        
        // Verify pool ownership
        poolService.getPoolEntityById(consultantId, poolId);
        
        List<Candidate> candidates = candidateRepository.searchCandidates(poolId, searchTerm);
        return candidates.stream()
                .map(candidateMapper::toResponse)
                .collect(Collectors.toList());
    }

    /**
     * Get recently onboarded candidates
     */
    @Transactional(readOnly = true)
    public List<CandidateResponse> getRecentlyOnboarded(Long consultantId, int limit) {
        log.debug("Fetching recently onboarded candidates");
        
        LocalDateTime thirtyDaysAgo = LocalDateTime.now().minusDays(30);
        List<Candidate> candidates = candidateRepository.findRecentlyOnboarded(
                consultantId, thirtyDaysAgo, PageRequest.of(0, limit));
        
        return candidates.stream()
                .map(candidateMapper::toResponse)
                .collect(Collectors.toList());
    }

    /**
     * Get all candidates for a consultant
     */
    @Transactional(readOnly = true)
    public List<CandidateResponse> getAllCandidates(Long consultantId) {
        log.debug("Fetching all candidates for consultant ID: {}", consultantId);
        
        List<Candidate> candidates = candidateRepository.findByConsultantId(consultantId);
        return candidates.stream()
                .map(candidateMapper::toResponse)
                .collect(Collectors.toList());
    }

    /**
     * Mark candidate as deployed to a job
     */
    @Transactional
    public void deployCandidateToJob(Long consultantId, Long candidateId, Long jobId, Long employerId) {
        log.info("Deploying candidate ID: {} to job ID: {}", candidateId, jobId);
        
        Candidate candidate = getCandidateEntityById(consultantId, candidateId);
        
        if (!candidate.getIsVerified()) {
            throw new BusinessException("Cannot deploy unverified candidate");
        }
        
        candidate.setAvailability(CandidateAvailability.DEPLOYED);
        candidate.setCurrentJobId(jobId);
        candidate.setCurrentEmployerId(employerId);
        candidate.setDeployedAt(LocalDateTime.now());
        
        candidateRepository.save(candidate);
        
        // Update pool metrics
        poolService.updatePoolMetrics(candidate.getPool().getId());
        
        log.info("Candidate deployed successfully");
    }
}
