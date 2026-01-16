package com.elowen.jobportal.notification.service;

import com.elowen.jobportal.notification.entity.Notification;
import com.elowen.jobportal.notification.entity.NotificationStatus;
import com.elowen.jobportal.notification.entity.NotificationType;
import com.elowen.jobportal.notification.repository.NotificationRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;

@Slf4j
@Service
@RequiredArgsConstructor
public class NotificationService {

    private final NotificationRepository notificationRepository;
    private final JavaMailSender mailSender;

    @Transactional
    public void sendEmailNotification(Long userId, String email, String title, String message, String relatedEntityId) {
        Notification notification = Notification.builder()
                .userId(userId)
                .type(NotificationType.EMAIL)
                .title(title)
                .message(message)
                .email(email)
                .relatedEntityId(relatedEntityId)
                .status(NotificationStatus.PENDING)
                .build();

        notification = notificationRepository.save(notification);
        log.info("Email notification created: {}", notification.getId());

        try {
            sendEmail(email, title, message);
            notification.setStatus(NotificationStatus.SENT);
            notification.setSentAt(LocalDateTime.now());
            log.info("Email sent successfully to: {}", email);
        } catch (Exception e) {
            log.error("Failed to send email to: {}", email, e);
            notification.setStatus(NotificationStatus.FAILED);
            notification.setErrorMessage(e.getMessage());
        }

        notificationRepository.save(notification);
    }

    @Transactional
    public void sendInAppNotification(Long userId, String title, String message, String relatedEntityId) {
        Notification notification = Notification.builder()
                .userId(userId)
                .type(NotificationType.IN_APP)
                .title(title)
                .message(message)
                .relatedEntityId(relatedEntityId)
                .status(NotificationStatus.SENT)
                .sentAt(LocalDateTime.now())
                .build();

        notificationRepository.save(notification);
        log.info("In-app notification created for user: {}", userId);
    }

    private void sendEmail(String to, String subject, String body) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(to);
        message.setSubject(subject);
        message.setText(body);
        message.setFrom("noreply@elowen.com");
        
        mailSender.send(message);
    }
}
