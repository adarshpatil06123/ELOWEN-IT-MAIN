package com.elowen.jobportal.consultant.dto.request;

import com.elowen.jobportal.consultant.domain.enums.CandidateAvailability;
import com.elowen.jobportal.consultant.domain.enums.Gender;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

/**
 * Request DTO for updating a candidate
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UpdateCandidateRequest {

    @Size(max = 100, message = "Name must not exceed 100 characters")
    private String name;

    private LocalDate dateOfBirth;

    private Gender gender;

    @Pattern(regexp = "^[0-9]{10,15}$", message = "Phone number must be 10-15 digits")
    private String phoneNumber;

    @Email(message = "Email must be valid")
    @Size(max = 100, message = "Email must not exceed 100 characters")
    private String email;

    @Size(max = 200, message = "Current address must not exceed 200 characters")
    private String currentAddress;

    @Size(max = 200, message = "Permanent address must not exceed 200 characters")
    private String permanentAddress;

    @Size(max = 100, message = "City must not exceed 100 characters")
    private String city;

    @Size(max = 50, message = "State must not exceed 50 characters")
    private String state;

    @Pattern(regexp = "^[0-9]{6,10}$", message = "Pincode must be 6-10 digits")
    private String pincode;

    @Size(max = 100, message = "Position must not exceed 100 characters")
    private String position;

    @Size(max = 50, message = "Work experience must not exceed 50 characters")
    private String workExperience;

    @Size(max = 100, message = "Skills must not exceed 100 characters")
    private String skills;

    @Size(max = 50, message = "Pay range min must not exceed 50 characters")
    private String payRangeMin;

    @Size(max = 50, message = "Pay range max must not exceed 50 characters")
    private String payRangeMax;

    private CandidateAvailability availability;

    @Size(max = 500, message = "Resume URL must not exceed 500 characters")
    private String resumeUrl;

    @Size(max = 500, message = "Photo URL must not exceed 500 characters")
    private String photoUrl;

    @Size(max = 500, message = "ID proof URL must not exceed 500 characters")
    private String idProofUrl;
}
