package com.elowen.jobportal.consultant.mapper;

import com.elowen.jobportal.consultant.domain.entity.Candidate;
import com.elowen.jobportal.consultant.domain.entity.Pool;
import com.elowen.jobportal.consultant.dto.request.CreateCandidateRequest;
import com.elowen.jobportal.consultant.dto.request.UpdateCandidateRequest;
import com.elowen.jobportal.consultant.dto.response.CandidateResponse;
import org.springframework.stereotype.Component;

/**
 * Mapper for Candidate entity and DTOs
 */
@Component
public class CandidateMapper {

    public CandidateResponse toResponse(Candidate candidate) {
        if (candidate == null) {
            return null;
        }

        return CandidateResponse.builder()
                .id(candidate.getId())
                .poolId(candidate.getPool().getId())
                .poolName(candidate.getPool().getName())
                .name(candidate.getName())
                .dateOfBirth(candidate.getDateOfBirth())
                .gender(candidate.getGender())
                .phoneNumber(candidate.getPhoneNumber())
                .email(candidate.getEmail())
                .currentAddress(candidate.getCurrentAddress())
                .permanentAddress(candidate.getPermanentAddress())
                .city(candidate.getCity())
                .state(candidate.getState())
                .pincode(candidate.getPincode())
                .position(candidate.getPosition())
                .workExperience(candidate.getWorkExperience())
                .skills(candidate.getSkills())
                .payRangeMin(candidate.getPayRangeMin())
                .payRangeMax(candidate.getPayRangeMax())
                .availability(candidate.getAvailability())
                .isVerified(candidate.getIsVerified())
                .resumeUrl(candidate.getResumeUrl())
                .photoUrl(candidate.getPhotoUrl())
                .idProofUrl(candidate.getIdProofUrl())
                .currentJobId(candidate.getCurrentJobId())
                .currentEmployerId(candidate.getCurrentEmployerId())
                .deployedAt(candidate.getDeployedAt())
                .createdAt(candidate.getCreatedAt())
                .updatedAt(candidate.getUpdatedAt())
                .build();
    }

    public Candidate toEntity(CreateCandidateRequest request, Pool pool) {
        return Candidate.builder()
                .pool(pool)
                .name(request.getName())
                .dateOfBirth(request.getDateOfBirth())
                .gender(request.getGender())
                .phoneNumber(request.getPhoneNumber())
                .email(request.getEmail())
                .currentAddress(request.getCurrentAddress())
                .permanentAddress(request.getPermanentAddress())
                .city(request.getCity())
                .state(request.getState())
                .pincode(request.getPincode())
                .position(request.getPosition())
                .workExperience(request.getWorkExperience())
                .skills(request.getSkills())
                .payRangeMin(request.getPayRangeMin())
                .payRangeMax(request.getPayRangeMax())
                .availability(request.getAvailability())
                .isVerified(false)
                .resumeUrl(request.getResumeUrl())
                .photoUrl(request.getPhotoUrl())
                .idProofUrl(request.getIdProofUrl())
                .build();
    }

    public void updateEntityFromRequest(Candidate candidate, UpdateCandidateRequest request) {
        if (request.getName() != null) {
            candidate.setName(request.getName());
        }
        if (request.getDateOfBirth() != null) {
            candidate.setDateOfBirth(request.getDateOfBirth());
        }
        if (request.getGender() != null) {
            candidate.setGender(request.getGender());
        }
        if (request.getPhoneNumber() != null) {
            candidate.setPhoneNumber(request.getPhoneNumber());
        }
        if (request.getEmail() != null) {
            candidate.setEmail(request.getEmail());
        }
        if (request.getCurrentAddress() != null) {
            candidate.setCurrentAddress(request.getCurrentAddress());
        }
        if (request.getPermanentAddress() != null) {
            candidate.setPermanentAddress(request.getPermanentAddress());
        }
        if (request.getCity() != null) {
            candidate.setCity(request.getCity());
        }
        if (request.getState() != null) {
            candidate.setState(request.getState());
        }
        if (request.getPincode() != null) {
            candidate.setPincode(request.getPincode());
        }
        if (request.getPosition() != null) {
            candidate.setPosition(request.getPosition());
        }
        if (request.getWorkExperience() != null) {
            candidate.setWorkExperience(request.getWorkExperience());
        }
        if (request.getSkills() != null) {
            candidate.setSkills(request.getSkills());
        }
        if (request.getPayRangeMin() != null) {
            candidate.setPayRangeMin(request.getPayRangeMin());
        }
        if (request.getPayRangeMax() != null) {
            candidate.setPayRangeMax(request.getPayRangeMax());
        }
        if (request.getAvailability() != null) {
            candidate.setAvailability(request.getAvailability());
        }
        if (request.getResumeUrl() != null) {
            candidate.setResumeUrl(request.getResumeUrl());
        }
        if (request.getPhotoUrl() != null) {
            candidate.setPhotoUrl(request.getPhotoUrl());
        }
        if (request.getIdProofUrl() != null) {
            candidate.setIdProofUrl(request.getIdProofUrl());
        }
    }
}
