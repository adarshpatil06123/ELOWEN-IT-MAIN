package com.elowen.jobportal.job.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * Company Information DTO for nested company details
 */
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CompanyInfoDto {
    private Long id;
    private String name;
    private String logoUrl;
    private String about;
    private String website;
    private Double rating;
    private Integer reviewCount;
}
