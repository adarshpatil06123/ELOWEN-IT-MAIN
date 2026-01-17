package com.elowen.jobportal.consultant.dto.request;

import com.elowen.jobportal.consultant.domain.enums.HiringLevel;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

/**
 * Request DTO for updating consultant specializations
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UpdateSpecializationsRequest {

    @NotEmpty(message = "At least one industry must be specified")
    private List<String> industriesServed;

    @NotEmpty(message = "At least one functional area must be specified")
    private List<String> functionalAreas;

    @NotEmpty(message = "At least one hiring level must be specified")
    private List<String> hiringLevels;

    @NotEmpty(message = "At least one location must be specified")
    private List<String> geographicCoverage;
}
