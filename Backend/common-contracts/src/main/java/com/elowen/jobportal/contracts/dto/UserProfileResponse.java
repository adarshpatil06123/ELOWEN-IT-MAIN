package com.elowen.jobportal.contracts.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

/**
 * User Profile Response DTO - Used across services
 * Represents user profile information
 */
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UserProfileResponse {
    
    private Long id;
    private String fullName;
    private String email;
    private String phone;
    private String role;
    private String state;
    private String city;
    
    @JsonFormat(pattern = "yyyy-MM-dd")
    private LocalDate dateOfBirth;
    
    private String profilePicture;
    private String bio;
    private String skills;
    private String education;
    private Boolean emailVerified;
    private Boolean phoneVerified;
    private Boolean isActive;
}
