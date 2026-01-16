package com.elowen.jobportal.job.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class JobRequest {

    @NotBlank(message = "Title is required")
    private String title;

    @NotBlank(message = "Company is required")
    private String company;

    @NotBlank(message = "Location is required")
    private String location;

    private String category;
    private String salary;
    private Integer minSalary;
    private Integer maxSalary;
    private String experience;
    private String languages;
    private String industry;
    private String functionalArea;
    private String experienceLevel;
    private String employmentType;
    private String joiningPeriod;
    private String companyDocs;
    private String description;
    private String requirements;
    private String benefits;
    private String jobType;
    private Boolean featured;
    private String expiresAt;
}
