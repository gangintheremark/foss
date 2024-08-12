package com.ssafy.foss.feedback.controller;

import com.ssafy.foss.feedback.dto.request.FeedbackRatingRequest;
import com.ssafy.foss.feedback.dto.request.InterviewMenteeFeedbackRequest;
import com.ssafy.foss.feedback.dto.request.InterviewMentorFeedbackRequest;
import com.ssafy.foss.feedback.dto.request.MenteeFeedbackRequest;
import com.ssafy.foss.feedback.service.FeedbackService;
import com.ssafy.foss.member.domain.PrincipalDetail;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.ArraySchema;
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

    @Operation(summary = "내 피드백 리스트", description = "내가 참여한 면접의 피드백 리스트")
    @ApiResponses(value = {@ApiResponse(responseCode = "200", description = "OK"), @ApiResponse(responseCode = "404", description = "Page Not Found"), @ApiResponse(responseCode = "500", description = "Internal Server Error")})
    @GetMapping()
    public ResponseEntity<?> findFeedbackList(@AuthenticationPrincipal PrincipalDetail principalDetail) {
        return ResponseEntity.ok().body(feedbackService.findFeedbackListByMenteeId(principalDetail.getId()));
    }

    @Operation(summary = "피드백 상세 조회", description = "특정 면접의 피드백 상세 조회")
    @ApiResponses(value = {@ApiResponse(responseCode = "200", description = "OK"), @ApiResponse(responseCode = "404", description = "Page Not Found"), @ApiResponse(responseCode = "500", description = "Internal Server Error")})
    @GetMapping("/{respondent_id}")
    public ResponseEntity<?> getMenteeFeedback(@PathVariable("respondent_id") Long respondentId, @AuthenticationPrincipal PrincipalDetail principalDetail) {
        return ResponseEntity.ok().body(feedbackService.findFeedbackDetailByFeedbackId(respondentId));
    }

    @Operation(summary = "멘티 피드백 작성", description = "다른 멘티에 대한 피드백 작성")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "OK"),
            @ApiResponse(responseCode = "400", description = "Bad Request"),
            @ApiResponse(responseCode = "500", description = "Internal Server Error")
    })
    @PostMapping("/mentee")
    public ResponseEntity<?> createMenteeFeedback(
            @io.swagger.v3.oas.annotations.parameters.RequestBody(description = "작성할 멘티 피드백 정보", required = true, content = @Content(array = @ArraySchema(schema = @Schema(implementation = MenteeFeedbackRequest.class))))
            @org.springframework.web.bind.annotation.RequestBody InterviewMenteeFeedbackRequest interviewMenteeFeedbackRequest,
            @AuthenticationPrincipal PrincipalDetail principalDetail) {
        feedbackService.createMenteeFeedback(interviewMenteeFeedbackRequest, principalDetail.getId());
        return ResponseEntity.ok().build();
    }

    @Operation(summary = "멘토 피드백 작성", description = "멘토가 멘티에 대해 적은 메모장 저장")
    @ApiResponses(value = {@ApiResponse(responseCode = "200", description = "OK"), @ApiResponse(responseCode = "400", description = "Bad Request"), @ApiResponse(responseCode = "500", description = "Internal Server Error")})
    @PostMapping("/mentor")
    public ResponseEntity<?> createMentorFeedback(@io.swagger.v3.oas.annotations.parameters.RequestBody(description = "작성할 멘토 피드백 정보", required = true, content = @Content(schema = @Schema(implementation = InterviewMentorFeedbackRequest.class))) @org.springframework.web.bind.annotation.RequestBody InterviewMentorFeedbackRequest interviewMentorFeedbackRequest, @AuthenticationPrincipal PrincipalDetail principalDetail) {
        feedbackService.createMentorFeedback(interviewMentorFeedbackRequest);
        return ResponseEntity.ok().build();
    }

    @Operation(summary = "멘티 평가 업데이트", description = "다른 멘티의 피드백을 보고 평가")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "OK"),
            @ApiResponse(responseCode = "400", description = "Bad Request"),
            @ApiResponse(responseCode = "500", description = "Internal Server Error")
    })
    @PutMapping("/ratings")
    public ResponseEntity<?> updateMenteeEvaluate(
            @io.swagger.v3.oas.annotations.parameters.RequestBody(description = "멘티 평가 정보", required = true, content = @Content(schema = @Schema(implementation = FeedbackRatingRequest.class)))
            @org.springframework.web.bind.annotation.RequestBody FeedbackRatingRequest feedbackRatingRequest) {
        feedbackService.updateMenteeEvaluate(feedbackRatingRequest);
        return ResponseEntity.ok().build();
    }

    @Operation(summary = "리뷰 작성 유무 조회", description = "리뷰 작성 유무 조회")
    @ApiResponses(value = {@ApiResponse(responseCode = "200", description = "OK"), @ApiResponse(responseCode = "404", description = "Page Not Found"), @ApiResponse(responseCode = "500", description = "Internal Server Error")})
    @PostMapping("/checkReview")
    public ResponseEntity<?> findIsReviewCheck(@RequestBody Long respondentId, @AuthenticationPrincipal PrincipalDetail principalDetail) {
        return ResponseEntity.ok().body(feedbackService.findIsCheckReview(respondentId));
    }
}
