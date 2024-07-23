package com.ssafy.foss.feedback.controller;

import com.ssafy.foss.feedback.service.FeedbackService;
import com.ssafy.foss.member.domain.PrincipalDetail;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@Tag(name = "Feedback", description = "Feedback 관련 API 입니다.")
@RestController
@CrossOrigin
@RequestMapping("/feedback")
public class FeedbackController {
    @Autowired
    private final FeedbackService feedbackService;

    public FeedbackController(FeedbackService feedbackService) {
        this.feedbackService = feedbackService;
    }

    @Operation(summary = "피드백 상세 조회", description = "특정 면접의 피드백 상세 조회")
    @ApiResponses(value = {@ApiResponse(responseCode = "200", description = "OK"),
            @ApiResponse(responseCode = "404", description = "Page Not Found"),
            @ApiResponse(responseCode = "500", description = "Internal Server Error")})
    @GetMapping("/{scheduleId}")
    public ResponseEntity<?> getMenteeFeedback(@PathVariable Long scheduleId,
                                               @AuthenticationPrincipal PrincipalDetail principalDetail) {
        return ResponseEntity.ok(feedbackService.findFeedbackDetailByFeedbackId(scheduleId, principalDetail.getId()));
    }
}
