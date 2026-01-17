package com.elowen.jobportal.consultant.dto.request;

import com.elowen.jobportal.consultant.domain.enums.PoolStatus;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * Request DTO for updating a candidate pool
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UpdatePoolRequest {

    @Size(max = 100, message = "Pool name must not exceed 100 characters")
    private String name;

    @Size(max = 100, message = "Skill category must not exceed 100 characters")
    private String skillCategory;

    @Size(max = 500, message = "Description must not exceed 500 characters")
    private String description;

    private PoolStatus status;
}
