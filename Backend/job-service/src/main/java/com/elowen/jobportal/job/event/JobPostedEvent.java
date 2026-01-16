package com.elowen.jobportal.job.event;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class JobPostedEvent implements Serializable {
    private Long jobId;
    private String title;
    private String company;
    private String location;
    private String category;
}
