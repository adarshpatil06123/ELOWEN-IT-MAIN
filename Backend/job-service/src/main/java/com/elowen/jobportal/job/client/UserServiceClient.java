package com.elowen.jobportal.job.client;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.List;
import java.util.Set;

/**
 * Feign client to communicate with user-service for saved jobs
 */
@FeignClient(name = "user-service", url = "${services.user.url:http://localhost:8082}")
public interface UserServiceClient {

    /**
     * Batch API: Get saved job IDs
     */
    @PostMapping("/internal/saved-jobs/batch-check")
    Set<Long> getSavedJobIds(@RequestParam Long userId, @RequestBody List<Long> jobIds);
}
