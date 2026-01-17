package com.elowen.jobportal.consultant.domain.enums;

/**
 * Hiring levels for candidates
 */
public enum HiringLevel {
    FRESHER("Fresher"),
    ENTRY("Entry Level"),
    MID("Mid Level"),
    SENIOR("Senior Level"),
    EXECUTIVE("Executive Level");

    private final String displayName;

    HiringLevel(String displayName) {
        this.displayName = displayName;
    }

    public String getDisplayName() {
        return displayName;
    }
}
