package com.ssafy.foss.notification.controller;

import com.ssafy.foss.notification.service.SSEService;
import com.ssafy.foss.member.domain.PrincipalDetail;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

@Tag(name = "SSEController", description = "SSE API")
@RestController
@RequestMapping("/sse")
@RequiredArgsConstructor
public class SSEController {
    private final SSEService sseService;

    @Operation(summary = "SSE 연결", description = "SSE를 연결합니다.")
    @GetMapping(value = "/subscribe", produces = MediaType.TEXT_EVENT_STREAM_VALUE)
    public SseEmitter subscribe(@AuthenticationPrincipal PrincipalDetail principalDetail) {
        return sseService.subscribe(principalDetail.getId());
    }

    public void sendDataTest(@PathVariable Long id) {
        sseService.notify(id, "data");
    }
}
