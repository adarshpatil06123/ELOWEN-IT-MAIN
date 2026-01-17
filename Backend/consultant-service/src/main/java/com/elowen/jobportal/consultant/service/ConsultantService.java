package com.elowen.jobportal.consultant.service;

import com.elowen.jobportal.consultant.domain.entity.Consultant;
import com.elowen.jobportal.consultant.dto.request.UpdateConsultantProfileRequest;
import com.elowen.jobportal.consultant.dto.request.UpdateSpecializationsRequest;
import com.elowen.jobportal.consultant.dto.response.ConsultantProfileResponse;
import com.elowen.jobportal.consultant.exception.ResourceNotFoundException;
import com.elowen.jobportal.consultant.mapper.ConsultantMapper;
import com.elowen.jobportal.consultant.repository.ConsultantRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Service for consultant profile management
 */
@Service
@RequiredArgsConstructor
@Slf4j
public class ConsultantService {

    private final ConsultantRepository consultantRepository;
    private final ConsultantMapper consultantMapper;

    /**
     * Get consultant profile by consultant ID
     */
    @Transactional(readOnly = true)
    public ConsultantProfileResponse getProfile(Long consultantId) {
        log.debug("Fetching consultant profile for ID: {}", consultantId);
        
        Consultant consultant = consultantRepository.findById(consultantId)
                .orElseThrow(() -> new ResourceNotFoundException("Consultant", consultantId));
        
        return consultantMapper.toProfileResponse(consultant);
    }

    /**
     * Get consultant profile by user ID (from auth service)
     */
    @Transactional(readOnly = true)
    public ConsultantProfileResponse getProfileByUserId(Long userId) {
        log.debug("Fetching consultant profile for user ID: {}", userId);
        
        Consultant consultant = consultantRepository.findByUserId(userId)
                .orElseThrow(() -> new ResourceNotFoundException("Consultant", "userId", userId));
        
        return consultantMapper.toProfileResponse(consultant);
    }

    /**
     * Get consultant entity by ID (internal use)
     */
    @Transactional(readOnly = true)
    public Consultant getConsultantById(Long consultantId) {
        return consultantRepository.findById(consultantId)
                .orElseThrow(() -> new ResourceNotFoundException("Consultant", consultantId));
    }

    /**
     * Get consultant entity by user ID (internal use)
     */
    @Transactional(readOnly = true)
    public Consultant getConsultantByUserId(Long userId) {
        return consultantRepository.findByUserId(userId)
                .orElseThrow(() -> new ResourceNotFoundException("Consultant", "userId", userId));
    }

    /**
     * Update consultant profile
     */
    @Transactional
    public ConsultantProfileResponse updateProfile(Long consultantId, UpdateConsultantProfileRequest request) {
        log.info("Updating consultant profile for ID: {}", consultantId);
        
        Consultant consultant = getConsultantById(consultantId);
        consultantMapper.updateEntityFromRequest(consultant, request);
        
        // Check if profile is complete
        updateProfileCompleteness(consultant);
        
        Consultant savedConsultant = consultantRepository.save(consultant);
        log.info("Consultant profile updated successfully for ID: {}", consultantId);
        
        return consultantMapper.toProfileResponse(savedConsultant);
    }

    /**
     * Update consultant profile by user ID
     */
    @Transactional
    public ConsultantProfileResponse updateProfileByUserId(Long userId, UpdateConsultantProfileRequest request) {
        log.info("Updating consultant profile for user ID: {}", userId);
        
        Consultant consultant = getConsultantByUserId(userId);
        consultantMapper.updateEntityFromRequest(consultant, request);
        
        // Check if profile is complete
        updateProfileCompleteness(consultant);
        
        Consultant savedConsultant = consultantRepository.save(consultant);
        log.info("Consultant profile updated successfully for user ID: {}", userId);
        
        return consultantMapper.toProfileResponse(savedConsultant);
    }

    /**
     * Update consultant specializations
     */
    @Transactional
    public ConsultantProfileResponse updateSpecializations(Long consultantId, UpdateSpecializationsRequest request) {
        log.info("Updating specializations for consultant ID: {}", consultantId);
        
        Consultant consultant = getConsultantById(consultantId);
        consultantMapper.updateSpecializations(consultant, request);
        
        // Check if profile is complete
        updateProfileCompleteness(consultant);
        
        Consultant savedConsultant = consultantRepository.save(consultant);
        log.info("Specializations updated successfully for consultant ID: {}", consultantId);
        
        return consultantMapper.toProfileResponse(savedConsultant);
    }

    /**
     * Create new consultant (called when user registers as consultant)
     */
    @Transactional
    public ConsultantProfileResponse createConsultant(Long userId, String email, String phoneNumber) {
        log.info("Creating new consultant for user ID: {}", userId);
        
        Consultant consultant = Consultant.builder()
                .userId(userId)
                .email(email)
                .phoneNumber(phoneNumber)
                .companyName("Unnamed Company") // Default value, will be updated via profile
                .contactPersonName("Contact Person") // Default value, will be updated via profile
                .isActive(true)
                .isVerified(false)
                .isProfileComplete(false)
                .build();
        
        Consultant savedConsultant = consultantRepository.save(consultant);
        log.info("Consultant created successfully with ID: {}", savedConsultant.getId());
        
        return consultantMapper.toProfileResponse(savedConsultant);
    }

    /**
     * Update profile completeness status
     */
    private void updateProfileCompleteness(Consultant consultant) {
        boolean isComplete = consultant.getCompanyName() != null &&
                           consultant.getContactPersonName() != null &&
                           consultant.getPhoneNumber() != null &&
                           consultant.getEmail() != null &&
                           consultant.getCity() != null &&
                           consultant.getState() != null &&
                           !consultant.getIndustriesServed().isEmpty() &&
                           !consultant.getFunctionalAreas().isEmpty() &&
                           !consultant.getHiringLevels().isEmpty() &&
                           !consultant.getGeographicalCoverage().isEmpty();
        
        consultant.setIsProfileComplete(isComplete);
    }

    /**
     * Update consultant verification status (admin only)
     */
    @Transactional
    public void updateVerificationStatus(Long consultantId, boolean isVerified) {
        log.info("Updating verification status for consultant ID: {} to {}", consultantId, isVerified);
        
        Consultant consultant = getConsultantById(consultantId);
        consultant.setIsVerified(isVerified);
        consultantRepository.save(consultant);
    }

    /**
     * Update consultant performance metrics
     */
    @Transactional
    public void updatePerformanceMetrics(Long consultantId, Integer placements, Double successRate, 
                                        Long incentives, Long commission) {
        log.debug("Updating performance metrics for consultant ID: {}", consultantId);
        
        Consultant consultant = getConsultantById(consultantId);
        
        if (placements != null) {
            consultant.setTotalPlacements(consultant.getTotalPlacements() + placements);
        }
        if (successRate != null) {
            consultant.setSuccessRate(successRate);
        }
        if (incentives != null) {
            consultant.setTotalIncentivesEarned(consultant.getTotalIncentivesEarned() + incentives);
        }
        if (commission != null) {
            consultant.setTotalCommissionEarned(consultant.getTotalCommissionEarned() + commission);
        }
        
        consultantRepository.save(consultant);
    }

    /**
     * Check if consultant exists by user ID
     */
    @Transactional(readOnly = true)
    public boolean existsByUserId(Long userId) {
        return consultantRepository.existsByUserId(userId);
    }
}
