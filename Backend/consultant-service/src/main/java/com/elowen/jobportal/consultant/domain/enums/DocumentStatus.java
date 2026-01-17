package com.elowen.jobportal.consultant.domain.enums;

/**
 * Status of uploaded documents
 */
public enum DocumentStatus {
    PENDING("Pending Verification"),
    VERIFIED("Verified"),
    REJECTED("Rejected");

    private final String displayName;

    DocumentStatus(String displayName) {
        this.displayName = displayName;
    }

    public String getDisplayName() {
        return displayName;
    }
}
