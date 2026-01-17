package com.elowen.jobportal.consultant.domain.enums;

/**
 * Availability status for candidates
 */
public enum CandidateAvailability {
    ACTIVE("Active"),
    INACTIVE("Inactive"),
    NEW("New"),
    DEPLOYED("Deployed");

    private final String displayName;

    CandidateAvailability(String displayName) {
        this.displayName = displayName;
    }

    public String getDisplayName() {
        return displayName;
    }
}
