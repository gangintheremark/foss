package com.ssafy.foss.review.service;

import com.ssafy.foss.review.domain.Review;
import com.ssafy.foss.review.dto.ReviewRequest;
import com.ssafy.foss.review.repository.ReviewRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ReviewServiceImpl implements ReviewService {

    @Autowired
    private ReviewRepository reviewRepository;

    @Override
    public List<Review> getAllReviewList() {
        return reviewRepository.findAll();
    }

    @Override
    public List<Review> getReviewListByMentor(Long mentorId) {
        return reviewRepository.findAllByMentorId(mentorId)
                .orElseThrow(() -> new RuntimeException("식별자가 " + mentorId + "인 멘토 리뷰를 찾을 수 없습니다."));
    }

    @Override
    public List<Review> getMyReviewByMentee(Long memberId) {
        return reviewRepository.findAllByMemberId(memberId)
                .orElseThrow(() -> new RuntimeException("식별자가 " + memberId + "인 멘티가 작성한 리뷰를 찾을 수 없습니다."));
    }

    @Override
    public List<Review> getMyReviewByMentor(Long mentorId) {
        return reviewRepository.findAllByMentorId(mentorId)
                .orElseThrow(() -> new RuntimeException("식별자가 " + mentorId + "인 멘토 리뷰를 찾을 수 없습니다."));
    }

    @Override
    public Review createReview(ReviewRequest reviewRequest) {
        Review review = Review.builder().content(reviewRequest.getContent())
                .mentorId(reviewRequest.getMentorId())
                .rating(reviewRequest.getRating()).build();

        return reviewRepository.save(review);
    }

    @Override
    public void deleteReview(Long reviewId) {
        Review review = reviewRepository.findById(reviewId)
                .orElseThrow(() -> new RuntimeException("식별자가 " + reviewId + "인 리뷰를 찾을 수 없습니다."));

        reviewRepository.delete(review);
    }
}
