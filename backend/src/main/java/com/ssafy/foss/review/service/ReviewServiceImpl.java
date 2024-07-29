package com.ssafy.foss.review.service;

import com.ssafy.foss.member.domain.Member;
import com.ssafy.foss.member.dto.MentorResponse;
import com.ssafy.foss.member.service.MemberService;
import com.ssafy.foss.review.domain.Review;
import com.ssafy.foss.review.dto.ReviewRequest;
import com.ssafy.foss.review.dto.response.ReviewInfoResponse;
import com.ssafy.foss.review.dto.response.ReviewMentorInfoResponse;
import com.ssafy.foss.review.dto.response.ReviewResponse;
import com.ssafy.foss.review.repository.ReviewRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

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

    //TODO : 현재 모든 리뷰에 같은 멘토의 정보를 담아서 주는데, 따로 줄지 프론트랑 협의 후 수정
    @Override
    public List<ReviewResponse> findReviewListByMentor(Long mentorId) {
        List<Review> reviewList = reviewRepository.findAllByMentorId(mentorId)
                .orElseThrow(() -> new RuntimeException("식별자가 " + mentorId + "인 멘토 리뷰를 찾을 수 없습니다."));

        MentorResponse mentorResponse = memberService.findMentorResponseById(mentorId);

        ReviewMentorInfoResponse mentorInfoResponse = ReviewMentorInfoResponse.builder()
                .mentorId(mentorId)
                .mentorName(mentorResponse.getName())
                .companyName(mentorResponse.getCompanyName())
                .department(mentorResponse.getDepartment())
                .profileImg(mentorResponse.getProfileImg())
                .build();

        return reviewList.stream()
                .map(review -> {
                    ReviewInfoResponse reviewInfo = ReviewInfoResponse.builder()
                            .writer(review.getMember().getName())
                            .rating(review.getRating())
                            .content(review.getContent())
                            .date(review.getCreatedDate())
                            .build();

                    return ReviewResponse.builder()
                            .reviewInfo(reviewInfo)
                            .mentorInfoResponse(mentorInfoResponse)
                            .build();
                })
                .collect(Collectors.toList());

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
