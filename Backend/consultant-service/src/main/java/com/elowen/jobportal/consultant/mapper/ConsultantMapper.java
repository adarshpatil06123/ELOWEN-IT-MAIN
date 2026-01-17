package com.elowen.jobportal.consultant.mapper;

import com.elowen.jobportal.consultant.domain.entity.Consultant;
import com.elowen.jobportal.consultant.domain.enums.HiringLevel;
import com.elowen.jobportal.consultant.dto.request.UpdateConsultantProfileRequest;
import com.elowen.jobportal.consultant.dto.request.UpdateSpecializationsRequest;
import com.elowen.jobportal.consultant.dto.response.ConsultantProfileResponse;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.stream.Collectors;

/**
 * Mapper for Consultant entity and DTOs
 */
@Component
public class ConsultantMapper {

    public ConsultantProfileResponse toProfileResponse(Consultant consultant) {
        if (consultant == null) {
            return null;
        }

        return ConsultantProfileResponse.builder()
                .id(consultant.getId())
                .userId(consultant.getUserId())
                .companyName(consultant.getCompanyName())
                .contactPersonName(consultant.getContactPersonName())
                .phoneNumber(consultant.getPhoneNumber())
                .alternatePhoneNumber(consultant.getAlternatePhoneNumber())
                .email(consultant.getEmail())
                .currentAddress(consultant.getCurrentAddress())
                .permanentAddress(consultant.getPermanentAddress())
                .city(consultant.getCity())
                .state(consultant.getState())
                .country(consultant.getCountry())
                .pincode(consultant.getPincode())
                .profileImageUrl(consultant.getProfileImageUrl())
                .industriesServed(consultant.getIndustriesServed())
                .functionalAreas(consultant.getFunctionalAreas())
                .hiringLevels(consultant.getHiringLevels())
                .geographicalCoverage(consultant.getGeographicalCoverage())
                .rating(consultant.getRating())
                .totalPlacements(consultant.getTotalPlacements())
                .successRate(consultant.getSuccessRate())
                .totalIncentivesEarned(consultant.getTotalIncentivesEarned())
                .totalCommissionEarned(consultant.getTotalCommissionEarned())
                .pendingCommission(consultant.getPendingCommission())
                .isActive(consultant.getIsActive())
                .isVerified(consultant.getIsVerified())
                .isProfileComplete(consultant.getIsProfileComplete())
                .createdAt(consultant.getCreatedAt())
                .updatedAt(consultant.getUpdatedAt())
                .build();
    }

    public void updateEntityFromRequest(Consultant consultant, UpdateConsultantProfileRequest request) {
        if (request.getCompanyName() != null) {
            consultant.setCompanyName(request.getCompanyName());
        }
        if (request.getContactPersonName() != null) {
            consultant.setContactPersonName(request.getContactPersonName());
        }
        if (request.getPhoneNumber() != null) {
            consultant.setPhoneNumber(request.getPhoneNumber());
        }
        if (request.getAlternatePhoneNumber() != null) {
            consultant.setAlternatePhoneNumber(request.getAlternatePhoneNumber());
        }
        if (request.getEmail() != null) {
            consultant.setEmail(request.getEmail());
        }
        if (request.getCurrentAddress() != null) {
            consultant.setCurrentAddress(request.getCurrentAddress());
        }
        if (request.getPermanentAddress() != null) {
            consultant.setPermanentAddress(request.getPermanentAddress());
        }
        if (request.getCity() != null) {
            consultant.setCity(request.getCity());
        }
        if (request.getState() != null) {
            consultant.setState(request.getState());
        }
        if (request.getCountry() != null) {
            consultant.setCountry(request.getCountry());
        }
        if (request.getPincode() != null) {
            consultant.setPincode(request.getPincode());
        }
        if (request.getProfileImageUrl() != null) {
            consultant.setProfileImageUrl(request.getProfileImageUrl());
        }
    }

    public void updateSpecializations(Consultant consultant, UpdateSpecializationsRequest request) {
        if (request.getIndustriesServed() != null) {
            consultant.setIndustriesServed(request.getIndustriesServed());
        }
        if (request.getFunctionalAreas() != null) {
            consultant.setFunctionalAreas(request.getFunctionalAreas());
        }
        if (request.getHiringLevels() != null) {
            List<HiringLevel> hiringLevels = request.getHiringLevels().stream()
                    .map(String::toUpperCase)
                    .map(level -> {
                        // Map common variations to enum values
                        switch (level) {
                            case "JUNIOR": return HiringLevel.ENTRY;
                            case "MID_LEVEL": return HiringLevel.MID;
                            case "LEAD": return HiringLevel.EXECUTIVE;
                            default:
                                try {
                                    return HiringLevel.valueOf(level);
                                } catch (IllegalArgumentException e) {
                                    return HiringLevel.MID; // Default fallback
                                }
                        }
                    })
                    .collect(Collectors.toList());
            consultant.setHiringLevels(hiringLevels);
        }
        if (request.getGeographicCoverage() != null) {
            consultant.setGeographicalCoverage(request.getGeographicCoverage());
        }
    }
}
