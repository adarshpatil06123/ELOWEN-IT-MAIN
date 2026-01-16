package com.elowen.jobportal.notification.listener;

import com.elowen.jobportal.notification.service.NotificationService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.stereotype.Component;

import java.util.Map;

@Slf4j
@Component
@RequiredArgsConstructor
public class ApplicationEventListener {

    private final NotificationService notificationService;

    @RabbitListener(queues = "notification-queue")
    public void handleApplicationSubmittedEvent(Map<String, Object> event) {
        try {
            log.info("Received application submitted event: {}", event);
            
            Long applicationId = ((Number) event.get("applicationId")).longValue();
            Long jobId = ((Number) event.get("jobId")).longValue();
            Long applicantId = ((Number) event.get("applicantId")).longValue();
            
            // Send notification to applicant
            String title = "Application Submitted Successfully";
            String message = "Your application for job #" + jobId + " has been submitted successfully. " +
                    "You will be notified once the employer reviews your application.";
            
            notificationService.sendInAppNotification(applicantId, title, message, String.valueOf(applicationId));
            
            log.info("Notification sent for application: {}", applicationId);
        } catch (Exception e) {
            log.error("Failed to process application event", e);
        }
    }

    @RabbitListener(queues = "job-notification-queue")
    public void handleJobPostedEvent(Map<String, Object> event) {
        try {
            log.info("Received job posted event: {}", event);
            
            Long jobId = ((Number) event.get("jobId")).longValue();
            String title = (String) event.get("title");
            String company = (String) event.get("company");
            
            log.info("Job posted notification - Job ID: {}, Title: {}, Company: {}", jobId, title, company);
            // Future: Notify matching candidates
        } catch (Exception e) {
            log.error("Failed to process job posted event", e);
        }
    }
}
