package com.elowen.jobportal.consultant.dto.response;

import com.elowen.jobportal.consultant.domain.enums.VerificationStatus;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * Response DTO for recently onboarded candidates
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class RecentlyOnboardedResponse {

    private Long candidateId;
    private String name;
    private String position;
    private VerificationStatus verificationStatus;
    private String statusMessage;
}
