package com.ssafy.foss.review.service;

import com.ssafy.foss.member.domain.Member;
import com.ssafy.foss.member.service.MemberService;
import com.ssafy.foss.review.domain.Review;
import com.ssafy.foss.review.dto.ReviewRequest;
import com.ssafy.foss.review.repository.ReviewRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Transactional(readOnly = true)
@RequiredArgsConstructor
@Service
public class ReviewServiceImpl implements ReviewService {

    private final ReviewRepository reviewRepository;
    private final MemberService memberService;

    @Override
    public List<Review> findAllReviewList() {
        return reviewRepository.findAll();
    }

    @Override
    public List<Review> findReviewListByMentor(Long mentorId) {
        return reviewRepository.findAllByMentorId(mentorId)
                .orElseThrow(() -> new RuntimeException("식별자가 " + mentorId + "인 멘토 리뷰를 찾을 수 없습니다."));
    }

    @Override
    public List<Review> findMyReviewByMentee(Long memberId) {
        return reviewRepository.findAllByMemberId(memberId)
                .orElseThrow(() -> new RuntimeException("식별자가 " + memberId + "인 멘티가 작성한 리뷰를 찾을 수 없습니다."));
    }

    @Override
    public List<Review> findMyReviewByMentor(Long mentorId) {
        return reviewRepository.findAllByMentorId(mentorId)
                .orElseThrow(() -> new RuntimeException("식별자가 " + mentorId + "인 멘토 리뷰를 찾을 수 없습니다."));
    }

    @Override
    @Transactional
    public Review createReview(Long memberId, ReviewRequest reviewRequest) {
        Member member = memberService.findById(memberId);
        Member mentor = memberService.findById(reviewRequest.getMentorId());

        return reviewRepository.save(buildReview(member, mentor, reviewRequest));
    }

    @Override
    public void deleteReview(Long reviewId) {
        Review review = reviewRepository.findById(reviewId)
                .orElseThrow(() -> new RuntimeException("식별자가 " + reviewId + "인 리뷰를 찾을 수 없습니다."));

        reviewRepository.delete(review);
    }

    private Review buildReview(Member member, Member mentor, ReviewRequest reviewRequest) {
        return Review.builder()
                .member(member)
                .content(reviewRequest.getContent())
                .mentor(mentor)
                .rating(reviewRequest.getRating()).build();
    }
}
