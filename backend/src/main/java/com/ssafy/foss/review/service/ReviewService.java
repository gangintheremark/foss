package com.ssafy.foss.review.service;

import com.ssafy.foss.review.domain.Review;

import java.util.List;

public interface ReviewService {
    List<Review> getAllReviewList();

    List<Review> getReviewListByMentor(Long mentorId);

    List<Review> getMyReviewByMentee(Long memberId);
}
