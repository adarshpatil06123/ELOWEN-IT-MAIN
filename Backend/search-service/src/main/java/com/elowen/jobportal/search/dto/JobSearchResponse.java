package com.elowen.jobportal.search.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class JobSearchResponse {
    private Long jobId;
    private String title;
    private String company;
    private String location;
    private String category;
    private String salary;
    private String experience;
    private String description;
    private String jobType;
    private Boolean featured;
    private Integer views;
    private Integer applicationsCount;
    private LocalDateTime createdAt;
    private Float score;
}
