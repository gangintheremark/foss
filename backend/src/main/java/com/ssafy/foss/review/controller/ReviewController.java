package com.ssafy.foss.review.controller;

import com.ssafy.foss.member.domain.PrincipalDetail;
import com.ssafy.foss.review.domain.Review;
import com.ssafy.foss.review.dto.ReviewRequest;
import com.ssafy.foss.review.service.ReviewService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.parameters.RequestBody;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.nio.charset.StandardCharsets;
import java.util.List;

//TODO : Review 엔티티에서 review와 member가 합쳐진 ReviewResponse로 반환타입 바꿀것
@Tag(name = "Review", description = "Review 관련 API 입니다.")
@RestController
@CrossOrigin
@RequestMapping("/review")
public class ReviewController {
    private final ReviewService reviewService;

    public ReviewController(ReviewService reviewService) {
        this.reviewService = reviewService;
    }

    // 전체 리뷰 리스트 조회
    @Operation(summary = "전제 리뷰 조회", description = "전체 리뷰 목록 가져오기")
    @ApiResponses(value = {@ApiResponse(responseCode = "200", description = "OK"),
            @ApiResponse(responseCode = "404", description = "Page Not Found"),
            @ApiResponse(responseCode = "500", description = "Internal Server Error")})
    @GetMapping("/")
    public ResponseEntity<?> getAllReviewList() {
        try {
            List<Review> response = reviewService.getAllReviewList();
            if (response != null) {
                HttpHeaders headers = new HttpHeaders();
                headers.setContentType(new MediaType("application", "json", StandardCharsets.UTF_8));
                return ResponseEntity.ok().headers(headers).body(response);
            } else {
                return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
            }
        } catch (Exception e) {
            return exceptionHandling(e);
        }
    }

    // 리뷰 리스트 조회 by 멘토
    @Operation(summary = "멘토 리뷰 조회", description = "특정 멘토의 리뷰 목록 가져오기")
    @ApiResponses(value = {@ApiResponse(responseCode = "200", description = "OK"),
            @ApiResponse(responseCode = "404", description = "Page Not Found"),
            @ApiResponse(responseCode = "500", description = "Internal Server Error")})
    @GetMapping("/")
    public ResponseEntity<?> getReviewListByMentor(@Parameter(required = true, description = "검색할 mentorId") @PathVariable("mentorId") Long mentorId
    ) {
        try {
            List<Review> response = reviewService.getReviewListByMentor(mentorId);
            if (response != null) {
                HttpHeaders headers = new HttpHeaders();
                headers.setContentType(new MediaType("application", "json", StandardCharsets.UTF_8));
                return ResponseEntity.ok().headers(headers).body(response);
            } else {
                return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
            }
        } catch (Exception e) {
            return exceptionHandling(e);
        }
    }

    // 내가 쓴 리뷰 조회 by 사용자(멘티)
    @Operation(summary = "내가 쓴 리뷰 조회", description = "내가 쓴 리뷰 목록 가져오기")
    @ApiResponses(value = {@ApiResponse(responseCode = "200", description = "OK"),
            @ApiResponse(responseCode = "404", description = "Page Not Found"),
            @ApiResponse(responseCode = "500", description = "Internal Server Error")})
    @GetMapping("/")
    public ResponseEntity<?> getMyReviewList(@AuthenticationPrincipal PrincipalDetail principalDetail) {
        try {
            List<Review> response = reviewService.getMyReviewByMentee(principalDetail.getId());
            if (response != null) {
                HttpHeaders headers = new HttpHeaders();
                return ResponseEntity.ok().headers(headers).body(response);
            } else {
                return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
            }
        } catch (Exception e) {
            return exceptionHandling(e);
        }
    }

    // 나의 리뷰 조회 by 사용자(멘토)
    @Operation(summary = "멘토 본인의 리뷰 조회", description = "멘토 본인의 리뷰 조회")
    @ApiResponses(value = {@ApiResponse(responseCode = "200", description = "OK"),
            @ApiResponse(responseCode = "404", description = "Page Not Found"),
            @ApiResponse(responseCode = "500", description = "Internal Server Error")})
    @GetMapping("/mentor")
    public ResponseEntity<?> getMyReviewListByMentor(@AuthenticationPrincipal PrincipalDetail principalDetail) {
        try {
            List<Review> response = reviewService.getMyReviewByMentor(principalDetail.getId());
            if (response != null) {
                HttpHeaders headers = new HttpHeaders();
                return ResponseEntity.ok().headers(headers).body(response);
            } else {
                return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
            }
        } catch (Exception e) {
            return exceptionHandling(e);
        }
    }

    // 리뷰 작성
    @Operation(summary = "리뷰 작성", description = "새로운 리뷰를 작성")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "OK"),
            @ApiResponse(responseCode = "400", description = "Bad Request"),
            @ApiResponse(responseCode = "500", description = "Internal Server Error")
    })
    @PostMapping("/")
    public ResponseEntity<?> post(@RequestBody(description = "작성할 리뷰 정보", required = true, content = @Content(schema = @Schema(implementation = ReviewRequest.class))) @org.springframework.web.bind.annotation.RequestBody ReviewRequest reviewRequest) {
        try {
            Review response = reviewService.createReview(reviewRequest);
            if (response != null) {
                HttpHeaders headers = new HttpHeaders();
                return ResponseEntity.ok().headers(headers).body(response);
            } else {
                return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
            }
        } catch (Exception e) {
            return exceptionHandling(e);
        }
    }

    // 리뷰 삭제
    @Operation(summary = "리뷰 삭제", description = "리뷰 삭제하기")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "OK"),
            @ApiResponse(responseCode = "400", description = "Bad Request"),
            @ApiResponse(responseCode = "500", description = "Internal Server Error")
    })
    @DeleteMapping("/{reviewId}")
    public ResponseEntity<?> delete(@Parameter(required = true, description = "삭제할 reviewId") @PathVariable("reviewId") Long reviewId) {
        try {
            reviewService.deleteReview(reviewId);
            return ResponseEntity.ok("게시물이 삭제되었습니다.");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("게시물 삭제에 실패했습니다.");
        }
    }


    private ResponseEntity<String> exceptionHandling(Exception e) {
        e.printStackTrace();
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error : " + e.getMessage());
    }
}
