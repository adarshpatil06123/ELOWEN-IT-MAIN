package com.elowen.jobportal.notification.controller;

import com.elowen.jobportal.notification.entity.Notification;
import com.elowen.jobportal.notification.repository.NotificationRepository;
import com.elowen.jobportal.contracts.constants.HeaderConstants;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@Slf4j
@RestController
@RequestMapping("/notifications")
@RequiredArgsConstructor
public class NotificationController {

    private final NotificationRepository notificationRepository;

    @GetMapping
    public ResponseEntity<Page<Notification>> getMyNotifications(
            @RequestHeader(HeaderConstants.USER_ID) Long userId,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "20") int size) {
        log.info("Get notifications for user: {}", userId);
        Page<Notification> notifications = notificationRepository.findByUserId(userId, PageRequest.of(page, size));
        return ResponseEntity.ok(notifications);
    }
}
