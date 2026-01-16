package com.elowen.jobportal.user.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UserRequest {
    private String fullName;
    private String phone;
    private String state;
    private String city;
    private String dateOfBirth;
    private String profilePicture;
    private String bio;
    private String skills;
    private String education;
    private String experience;
}
