package com.elowen.jobportal.application.event;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ApplicationSubmittedEvent implements Serializable {
    private Long applicationId;
    private Long jobId;
    private Long applicantId;
}
