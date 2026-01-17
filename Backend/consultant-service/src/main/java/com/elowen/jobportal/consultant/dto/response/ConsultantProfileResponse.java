package com.elowen.jobportal.consultant.dto.response;

import com.elowen.jobportal.consultant.domain.enums.HiringLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;

/**
 * Response DTO for consultant profile
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ConsultantProfileResponse {

    private Long id;
    private Long userId;
    private String companyName;
    private String contactPersonName;
    private String phoneNumber;
    private String alternatePhoneNumber;
    private String email;
    private String currentAddress;
    private String permanentAddress;
    private String city;
    private String state;
    private String country;
    private String pincode;
    private String profileImageUrl;

    // Specializations
    private List<String> industriesServed;
    private List<String> functionalAreas;
    private List<HiringLevel> hiringLevels;
    private List<String> geographicalCoverage;

    // Performance
    private Double rating;
    private Integer totalPlacements;
    private Double successRate;
    private Long totalIncentivesEarned;
    private Long totalCommissionEarned;
    private Long pendingCommission;

    // Status
    private Boolean isActive;
    private Boolean isVerified;
    private Boolean isProfileComplete;

    // Timestamps
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
