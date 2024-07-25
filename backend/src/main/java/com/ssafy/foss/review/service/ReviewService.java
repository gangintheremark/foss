package com.ssafy.foss.review.service;

import com.ssafy.foss.review.domain.Review;
import com.ssafy.foss.review.dto.ReviewRequest;

import java.util.List;

public interface ReviewService {
    List<Review> findAllReviewList();

    List<Review> findReviewListByMentor(Long mentorId);

    List<Review> findMyReviewByMentee(Long memberId);

    List<Review> findMyReviewByMentor(Long mentorId);

    Review createReview(Long memberId, ReviewRequest reviewRequest);

    void deleteReview(Long reviewId);
}
