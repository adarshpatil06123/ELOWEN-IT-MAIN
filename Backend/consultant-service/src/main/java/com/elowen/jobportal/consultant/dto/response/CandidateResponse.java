package com.elowen.jobportal.consultant.dto.response;

import com.elowen.jobportal.consultant.domain.enums.CandidateAvailability;
import com.elowen.jobportal.consultant.domain.enums.Gender;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalDateTime;

/**
 * Response DTO for candidate
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CandidateResponse {

    private Long id;
    private Long poolId;
    private String poolName;
    
    // Personal Information
    private String name;
    private LocalDate dateOfBirth;
    private Gender gender;
    private String phoneNumber;
    private String email;
    private String currentAddress;
    private String permanentAddress;
    private String city;
    private String state;
    private String pincode;

    // Professional Information
    private String position;
    private String workExperience;
    private String skills;
    private String payRangeMin;
    private String payRangeMax;

    // Status
    private CandidateAvailability availability;
    private Boolean isVerified;

    // Documents
    private String resumeUrl;
    private String photoUrl;
    private String idProofUrl;

    // Placement
    private Long currentJobId;
    private Long currentEmployerId;
    private LocalDateTime deployedAt;

    // Timestamps
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
