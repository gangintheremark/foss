package com.ssafy.foss.notification.controller;

import com.ssafy.foss.notification.dto.NotificationResponse;
import com.ssafy.foss.notification.service.NotificationService;
import com.ssafy.foss.member.domain.PrincipalDetail;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;
import java.util.List;
import java.util.Map;

@Tag(name = "NotificationController", description = "알림 API")
@RequestMapping("/notifications")
@RestController
@RequiredArgsConstructor
public class NotificationController {
    private final NotificationService notificationService;

    @Operation(summary = "알림 조회", description = "자신의 알림을 조회합니다.")
    @GetMapping
    public ResponseEntity<List<NotificationResponse>> findNotification(@AuthenticationPrincipal PrincipalDetail principalDetail) {
        return ResponseEntity.ok(notificationService.findById(principalDetail.getId()));
    }

    @Operation(summary = "읽지 않은 알림 개수 조회", description = "읽지 않은 알림 개수를 조회합니다.")
    @GetMapping("/unreadCounts")
    public ResponseEntity<Map<String, Long>> findUnreadNotificationsCount(@AuthenticationPrincipal PrincipalDetail principalDetail) {
        return ResponseEntity.ok(Collections.singletonMap("unreadCount", notificationService.unreadNotificationCount(principalDetail.getId())));
    }

    @Operation(summary = "알림 확인", description = "자신의 알림을 확인합니다.")
    @PutMapping("/{notificationId}")
    public ResponseEntity<List<NotificationResponse>> updateNotification(@PathVariable(name = "notificationId") Long notificationId) {
        notificationService.updateIsRead(notificationId);
        return ResponseEntity.noContent().build();
    }

//    @PostMapping
//    public Notification test(@RequestBody Notification notification) {
//        return notificationService.create(notification);
//    }
}
