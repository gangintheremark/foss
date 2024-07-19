package com.ssafy.foss.Notification.controller;

import com.ssafy.foss.Notification.service.SSEService;
import com.ssafy.foss.member.domain.PrincipalDetail;
import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

@RestController
@RequestMapping("/sse")
@RequiredArgsConstructor
public class SSEController {
    private final SSEService sseService;

        @GetMapping(value = "/subscribe", produces = MediaType.TEXT_EVENT_STREAM_VALUE)
    public SseEmitter subscribe(@AuthenticationPrincipal PrincipalDetail principalDetail) {
        return sseService.subscribe(principalDetail.getId());
    }

    public void sendDataTest(@PathVariable Long id) {
        sseService.notify(id, "data");
    }
}
