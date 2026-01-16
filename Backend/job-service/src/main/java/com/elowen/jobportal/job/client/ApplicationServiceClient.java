package com.elowen.jobportal.job.client;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.List;
import java.util.Set;

/**
 * Feign client to communicate with application-service
 */
@FeignClient(name = "application-service", url = "${services.application.url:http://localhost:8084}")
public interface ApplicationServiceClient {

    /**
     * Batch API: Get applied job IDs
     */
    @PostMapping("/internal/applications/batch-check")
    Set<Long> getAppliedJobIds(@RequestParam Long userId, @RequestBody List<Long> jobIds);
}
