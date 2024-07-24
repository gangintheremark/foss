package com.ssafy.foss.notification.controller;

import com.ssafy.foss.notification.dto.NotificationResponse;
import com.ssafy.foss.notification.service.NotificationService;
import com.ssafy.foss.member.domain.PrincipalDetail;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;
import java.util.List;
import java.util.Map;

@RequestMapping("/notifications")
@RestController
@RequiredArgsConstructor
public class NotificationController {
    private final NotificationService notificationService;

    @GetMapping
    public ResponseEntity<List<NotificationResponse>> findNotification(@AuthenticationPrincipal PrincipalDetail principalDetail) {
        return ResponseEntity.ok(notificationService.findById(principalDetail.getId()));
    }

    @GetMapping("/unreadCounts")
    public ResponseEntity<Map<String, Long>> findUnreadNotificationsCount(@AuthenticationPrincipal PrincipalDetail principalDetail) {
        return ResponseEntity.ok(Collections.singletonMap("unreadCount", notificationService.unreadNotificationCount(principalDetail.getId())));
    }

//    @PostMapping
//    public Notification test(@RequestBody Notification notification) {
//        return notificationService.create(notification);
//    }
}
