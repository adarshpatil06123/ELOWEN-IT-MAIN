package com.elowen.jobportal.auth.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class OTPResponse {
    private String message;
    private String phone;
    private String otp; // For testing only - remove in production
}
