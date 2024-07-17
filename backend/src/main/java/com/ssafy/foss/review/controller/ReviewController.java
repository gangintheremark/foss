package com.ssafy.foss.review.controller;

import com.ssafy.foss.review.domain.Review;
import com.ssafy.foss.review.dto.ReviewResponse;
import com.ssafy.foss.review.service.ReviewService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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

    //TODO: 전체 리뷰 리스트 조회
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

    //TODO: 리뷰 리스트 조회 by 멘토

    //TODO: 내가 쓴 리뷰 조회 by 사용자(멘티)

    //TODO: 리뷰 작성

    //TODO: 리뷰 삭제


    private ResponseEntity<String> exceptionHandling(Exception e) {
        e.printStackTrace();
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error : " + e.getMessage());
    }
}
