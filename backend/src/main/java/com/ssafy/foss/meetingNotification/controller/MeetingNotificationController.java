// MeetingNotificationController.java
package com.ssafy.foss.meetingNotification.controller;

import com.ssafy.foss.meetingNotification.service.MeetingNotificationService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/meeting-notifications")
public class MeetingNotificationController {

    private final MeetingNotificationService meetingNotificationService;

    public MeetingNotificationController(MeetingNotificationService meetingNotificationService) {
        this.meetingNotificationService = meetingNotificationService;
    }

    @PostMapping("/participants/meetings/{sessionId}/notify")
    public ResponseEntity<Void> notifyParticipant(
            @PathVariable String sessionId,
            @RequestBody Map<String, Long> memberIdPayload) {
        Long memberId = memberIdPayload.get("memberId");
        meetingNotificationService.notifyParticipant(sessionId, memberId);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/sessions/{sessionId}/members/{memberId}")
    public ResponseEntity<Boolean> hasReceivedNotification(@PathVariable String sessionId, @PathVariable Long memberId) {
        boolean hasReceivedNotification = meetingNotificationService.hasReceivedNotification(sessionId, memberId);
        return ResponseEntity.ok(hasReceivedNotification);
    }
}
