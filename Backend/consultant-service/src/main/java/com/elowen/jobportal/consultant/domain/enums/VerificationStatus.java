package com.elowen.jobportal.consultant.domain.enums;

/**
 * Verification status for candidates
 */
public enum VerificationStatus {
    NEW("New"),
    UNDER_VERIFICATION("Under Verification"),
    POLICE_VERIFIED("Police Verified"),
    HEALTH_CHECK_REQUIRED("Health check-up required"),
    VERIFIED("Verified"),
    REJECTED("Rejected");

    private final String displayName;

    VerificationStatus(String displayName) {
        this.displayName = displayName;
    }

    public String getDisplayName() {
        return displayName;
    }
}
