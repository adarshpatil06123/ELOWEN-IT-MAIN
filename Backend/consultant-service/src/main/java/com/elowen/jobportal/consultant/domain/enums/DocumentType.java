package com.elowen.jobportal.consultant.domain.enums;

/**
 * Types of documents required for consultant KYC verification
 */
public enum DocumentType {
    GST_CERTIFICATE("GST Certificate"),
    CERTIFICATE_OF_INCORPORATION("Certificate of Incorporation"),
    PAN("PAN"),
    EPFO_REGISTRATION_CERTIFICATE("EPFO Registration Certificate (Provident-Fund)"),
    ESIC_REGISTRATION("ESIC Registration (Employee State Insurance)"),
    LABOUR_LICENSE("Labour License"),
    STATE_SPECIFIC_LABOUR_WELFARE_REGISTRATION("State-Specific Labour Welfare Registration");

    private final String displayName;

    DocumentType(String displayName) {
        this.displayName = displayName;
    }

    public String getDisplayName() {
        return displayName;
    }
}
