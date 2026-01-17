package com.elowen.jobportal.consultant.dto.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * Request DTO for creating a candidate pool
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CreatePoolRequest {

    @NotBlank(message = "Pool name is required")
    @Size(max = 100, message = "Pool name must not exceed 100 characters")
    private String name;

    @NotBlank(message = "Skill category is required")
    @Size(max = 100, message = "Skill category must not exceed 100 characters")
    private String skillCategory;

    @Size(max = 500, message = "Description must not exceed 500 characters")
    private String description;
}
