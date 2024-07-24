package com.ssafy.foss.feedback.controller;

import com.ssafy.foss.feedback.dto.request.MenteeFeedbackRequest;
import com.ssafy.foss.feedback.service.FeedbackService;
import com.ssafy.foss.member.domain.PrincipalDetail;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RequiredArgsConstructor
@Tag(name = "Feedback", description = "Feedback 관련 API 입니다.")
@RestController
@CrossOrigin
@RequestMapping("/feedback")
public class FeedbackController {
    private final FeedbackService feedbackService;

    @Operation(summary = "피드백 상세 조회", description = "특정 면접의 피드백 상세 조회")
    @ApiResponses(value = {@ApiResponse(responseCode = "200", description = "OK"), @ApiResponse(responseCode = "404", description = "Page Not Found"), @ApiResponse(responseCode = "500", description = "Internal Server Error")})
    @GetMapping("/{scheduleId}")
    public ResponseEntity<?> getMenteeFeedback(@PathVariable Long scheduleId, @AuthenticationPrincipal PrincipalDetail principalDetail) {
        return ResponseEntity.ok(feedbackService.findFeedbackDetailByFeedbackId(scheduleId, principalDetail.getId()));
    }

    @Operation(summary = "멘티 피드백 작성", description = "다른 멘티에 대한 피드백 작성")
    @ApiResponses(value = {@ApiResponse(responseCode = "200", description = "OK"), @ApiResponse(responseCode = "400", description = "Bad Request"), @ApiResponse(responseCode = "500", description = "Internal Server Error")})
    @PostMapping("/mentee")
    public ResponseEntity<?> createMenteeFeedback(@io.swagger.v3.oas.annotations.parameters.RequestBody(description = "작성할 멘티 피드백 정보", required = true, content = @Content(schema = @Schema(implementation = MenteeFeedbackRequest.class))) @org.springframework.web.bind.annotation.RequestBody MenteeFeedbackRequest menteeFeedbackRequest, @AuthenticationPrincipal PrincipalDetail principalDetail) {
        return ResponseEntity.ok(feedbackService.createMenteeFeedback(menteeFeedbackRequest, principalDetail.getId()));
    }
}
