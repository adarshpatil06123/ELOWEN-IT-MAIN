package com.elowen.jobportal.search.listener;

import com.elowen.jobportal.search.document.JobDocument;
import com.elowen.jobportal.search.service.SearchService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;
import java.util.Map;

@Slf4j
@Component
@RequiredArgsConstructor
public class JobEventListener {

    private final SearchService searchService;

    @RabbitListener(queues = "job-search-queue")
    public void handleJobPostedEvent(Map<String, Object> event) {
        try {
            log.info("Received job posted event: {}", event);
            
            JobDocument jobDocument = JobDocument.builder()
                    .jobId(((Number) event.get("jobId")).longValue())
                    .title((String) event.get("title"))
                    .company((String) event.get("company"))
                    .location((String) event.get("location"))
                    .category((String) event.get("category"))
                    .createdAt(LocalDateTime.now())
                    .featured(false)
                    .views(0)
                    .applicationsCount(0)
                    .build();
            
            searchService.indexJob(jobDocument);
            log.info("Job indexed successfully: {}", jobDocument.getJobId());
        } catch (Exception e) {
            log.error("Failed to index job", e);
        }
    }
}
