package com.ssafy.foss.notification.repository;

import com.ssafy.foss.notification.domain.Notification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface NotificationRepository extends JpaRepository<Notification, Long> {
    List<Notification> findAllByReceiverIdOrderByCreatedDateDesc(Long receiverId);

    List<Notification> findAllByReceiverId(Long receiverId);
}
