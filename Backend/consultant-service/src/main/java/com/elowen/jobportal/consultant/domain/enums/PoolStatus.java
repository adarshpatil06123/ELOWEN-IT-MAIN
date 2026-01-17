package com.elowen.jobportal.consultant.domain.enums;

/**
 * Status of candidate pools
 */
public enum PoolStatus {
    ACTIVE("Active"),
    INACTIVE("Inactive"),
    NEW("New");

    private final String displayName;

    PoolStatus(String displayName) {
        this.displayName = displayName;
    }

    public String getDisplayName() {
        return displayName;
    }
}
