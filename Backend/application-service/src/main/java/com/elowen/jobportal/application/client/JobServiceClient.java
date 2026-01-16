package com.elowen.jobportal.application.client;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;

@FeignClient(name = "job-service")
public interface JobServiceClient {

    @PostMapping("/jobs/{jobId}/increment-applications")
    void incrementApplicationCount(@PathVariable("jobId") Long jobId);
    
    /**
     * Verify if job exists and is active
     */
    @GetMapping("/internal/jobs/{jobId}/is-active")
    Boolean isJobActive(@PathVariable("jobId") Long jobId);
}
