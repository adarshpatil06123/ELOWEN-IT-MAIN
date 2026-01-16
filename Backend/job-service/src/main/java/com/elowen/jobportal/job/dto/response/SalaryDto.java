package com.elowen.jobportal.job.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * Salary DTO for nested salary information
 */
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class SalaryDto {
    private String min;
    private String max;
    private String currency;
    private String displayText;
    
    /**
     * Get formatted display text
     */
    public String getFormattedDisplay() {
        if (displayText != null && !displayText.isEmpty()) {
            return displayText;
        }
        if (min != null && max != null) {
            String currencySymbol = "INR".equals(currency) ? "₹" : currency != null ? currency : "";
            return currencySymbol + min + " - " + currencySymbol + max;
        }
        return "";
    }
}
