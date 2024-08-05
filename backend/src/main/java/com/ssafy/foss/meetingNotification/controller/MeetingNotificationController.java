package com.ssafy.foss.meetingNotification.controller;

import com.ssafy.foss.meetingNotification.service.MeetingNotificationService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequiredArgsConstructor
@RequestMapping("/meeting-notifications")
public class MeetingNotificationController {

    private final MeetingNotificationService meetingNotificationService;

    @PostMapping("/participants/meetings/{sessionId}/notify")
    public ResponseEntity<Void> notifyParticipant(
            @PathVariable String sessionId,
            @RequestBody Map<String, Long> memberIdPayload) {
        meetingNotificationService.notifyParticipant(sessionId, memberIdPayload.get("memberId"));
        return ResponseEntity.ok().build();
    }

    @GetMapping("/sessions/{sessionId}/members/{memberId}")
    public ResponseEntity<Boolean> hasReceivedNotification(@PathVariable String sessionId, @PathVariable Long memberId) {
        return ResponseEntity.ok(meetingNotificationService.hasReceivedNotification(sessionId, memberId));
    }

    @GetMapping("/sessions/member/{memberId}")
    public ResponseEntity<String> getSessionIdByMember(@PathVariable Long memberId) {
        String sessionId = meetingNotificationService.findSessionIdByMemberId(memberId);
        return sessionId != null ? ResponseEntity.ok(sessionId) : ResponseEntity.notFound().build();
    }

    @DeleteMapping("/sessions/{sessionId}/notifications")
    public ResponseEntity<Void> removeAllNotifications(
            @PathVariable String sessionId) {
        meetingNotificationService.removeAllNotifications(sessionId);
        return ResponseEntity.ok().build();
    }


}
