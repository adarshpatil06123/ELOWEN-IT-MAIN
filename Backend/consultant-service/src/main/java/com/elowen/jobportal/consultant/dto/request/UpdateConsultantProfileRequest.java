package com.elowen.jobportal.consultant.dto.request;

import com.elowen.jobportal.consultant.domain.enums.HiringLevel;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

/**
 * Request DTO for updating consultant profile
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UpdateConsultantProfileRequest {

    @NotBlank(message = "Company name is required")
    @Size(max = 100, message = "Company name must not exceed 100 characters")
    private String companyName;

    @NotBlank(message = "Contact person name is required")
    @Size(max = 100, message = "Contact person name must not exceed 100 characters")
    private String contactPersonName;

    @NotBlank(message = "Phone number is required")
    @Pattern(regexp = "^[0-9]{10,15}$", message = "Phone number must be 10-15 digits")
    private String phoneNumber;

    @Pattern(regexp = "^[0-9]{10,15}$", message = "Alternate phone number must be 10-15 digits")
    private String alternatePhoneNumber;

    @NotBlank(message = "Email is required")
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

    @Size(max = 100, message = "Country must not exceed 100 characters")
    private String country;

    @Pattern(regexp = "^[0-9]{6,10}$", message = "Pincode must be 6-10 digits")
    private String pincode;

    @Size(max = 500, message = "Profile image URL must not exceed 500 characters")
    private String profileImageUrl;
}
