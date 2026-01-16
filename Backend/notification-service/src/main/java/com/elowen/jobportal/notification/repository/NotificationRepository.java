package com.elowen.jobportal.notification.repository;

import com.elowen.jobportal.notification.entity.Notification;
import com.elowen.jobportal.notification.entity.NotificationStatus;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface NotificationRepository extends JpaRepository<Notification, Long> {
    
    Page<Notification> findByUserId(Long userId, Pageable pageable);
    
    List<Notification> findByStatus(NotificationStatus status);
    
    List<Notification> findByStatusAndRetryCountLessThan(NotificationStatus status, Integer maxRetries);
}
