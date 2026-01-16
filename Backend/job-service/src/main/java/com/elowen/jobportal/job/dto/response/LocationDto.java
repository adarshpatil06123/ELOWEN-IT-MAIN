package com.elowen.jobportal.job.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * Location DTO for nested location information
 */
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class LocationDto {
    private String city;
    private String state;
    private String country;
    
    /**
     * Get formatted location string (City, State)
     */
    public String getDisplayText() {
        if (city != null && state != null) {
            return city + ", " + state;
        } else if (city != null) {
            return city;
        } else if (state != null) {
            return state;
        }
        return "";
    }
}
