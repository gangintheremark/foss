package com.ssafy.foss.notification.service;

import com.ssafy.foss.notification.domain.Notification;
import com.ssafy.foss.notification.dto.NotificationResponse;
import com.ssafy.foss.notification.repository.NotificationRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class NotificationService {
    private final NotificationRepository notificationRepository;
    private final SSEService sseService;

    @Transactional
    public Notification create(Notification notification) {
        Map<String, Object> map = new HashMap<>();

        map.put("notificationResponse", mapToNotificationResponse(notification));
        map.put("unreadCount", unreadNotificationCount(notification.getReceiver().getId()) + 1);

        sseService.notify(notification.getReceiver().getId(), map);
        return notificationRepository.save(notification);
    }

    @Transactional
    public List<Notification> create(List<Notification> notifications) {
        Map<String, Object> map = new HashMap<>();
        notifications.stream()
                .forEach(n -> {
                    map.clear();
                    map.put("notificationResponse", mapToNotificationResponse(n));
                    map.put("unreadCount", unreadNotificationCount(n.getReceiver().getId()) + 1);
                    sseService.notify(n.getReceiver().getId(), map);
                });
        return notificationRepository.saveAll(notifications);
    }

    public List<NotificationResponse> findById(Long memberId) {
        List<Notification> notifications = notificationRepository.findAllByReceiverIdOrderByCreatedDateDesc(memberId);

        return mapToNotificationResponse(notifications);
    }

    @Transactional
    public void updateIsRead(Long id) {
        Notification notification = notificationRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("식별자가 " + id + "인 알림이 존재하지 않습니다."));
        if (!notification.isRead()) notification.setIsRead(true);
    }

    private NotificationResponse mapToNotificationResponse(Notification notification) {
        return NotificationResponse.builder()
                .id(notification.getId())
                .content(notification.getContent())
                .targetUrl(notification.getTargetUrl())
                .isRead(notification.isRead())
                .createdDate("방금 전")
                .build();
    }

    private List<NotificationResponse> mapToNotificationResponse(List<Notification> notifications) {
        return notifications.stream()
                .map(notification -> {
                    String createdDateStr = formatCreatedDate(notification.getCreatedDate(), LocalDateTime.now());
                    return NotificationResponse.builder()
                            .id(notification.getId())
                            .content(notification.getContent())
                            .targetUrl(notification.getTargetUrl())
                            .isRead(notification.isRead())
                            .createdDate(createdDateStr)
                            .build();
                })
                .collect(Collectors.toList());
    }

    private String formatCreatedDate(LocalDateTime startDT, LocalDateTime endDT) {
        long daysBetween = ChronoUnit.DAYS.between(startDT, endDT);
        if (daysBetween == 0) {
            long hoursBetween = ChronoUnit.HOURS.between(startDT, endDT);
            if (hoursBetween == 0) {
                long minutesBetween = ChronoUnit.MINUTES.between(startDT, endDT);
                if (minutesBetween == 0) {
                    return "방금 전";
                } else {
                    return minutesBetween + "분 전";
                }
            } else {
                return hoursBetween + "시간 전";
            }
        } else {
            return startDT.toLocalDate().toString().replace('-', '.');
        }
    }

    public Long unreadNotificationCount(Long memberId) {
        List<Notification> notifications = notificationRepository.findAllByReceiverId(memberId);

        long unreadCount = notifications.stream()
                .filter(notification -> !notification.isRead())
                .count();

        return unreadCount;
    }

}
