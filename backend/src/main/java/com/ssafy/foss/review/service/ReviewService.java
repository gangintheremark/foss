package com.ssafy.foss.review.service;

import com.ssafy.foss.review.domain.Review;
import com.ssafy.foss.review.dto.request.ReviewRequest;
import com.ssafy.foss.review.dto.response.ReviewInfoResponse;
import com.ssafy.foss.review.dto.response.ReviewResponse;

import java.util.List;

public interface ReviewService {
    List<ReviewResponse> findAllReviewList();

    List<ReviewResponse> findReviewListByMentor(Long mentorId);

    List<ReviewInfoResponse> findMyReviewByMentor(Long mentorId);

    void createReview(Long memberId, ReviewRequest reviewRequest);
}
