package com.ssafy.foss.review.service;

import com.ssafy.foss.exception.DataAlreadyExistsException;
import com.ssafy.foss.feedback.domain.MentorFeedback;
import com.ssafy.foss.feedback.repository.MentorFeedbackRepository;
import com.ssafy.foss.feedback.service.FeedbackService;
import com.ssafy.foss.interview.domain.Interview;
import com.ssafy.foss.interview.repository.InterviewRepository;
import com.ssafy.foss.member.domain.Member;
import com.ssafy.foss.member.dto.MentorResponse;
import com.ssafy.foss.member.service.MemberService;
import com.ssafy.foss.respondent.domain.Respondent;
import com.ssafy.foss.respondent.repository.RespondentRepository;
import com.ssafy.foss.review.domain.Review;
import com.ssafy.foss.review.dto.request.ReviewRequest;
import com.ssafy.foss.review.dto.response.ReviewInfoResponse;
import com.ssafy.foss.review.dto.response.ReviewMentorInfoResponse;
import com.ssafy.foss.review.dto.response.ReviewResponse;
import com.ssafy.foss.review.repository.ReviewRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.joda.time.DateTime;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.stream.Collectors;

@Transactional(readOnly = true)
@RequiredArgsConstructor
@Service
public class ReviewServiceImpl implements ReviewService {

    private final MemberService memberService;
    private final FeedbackService feedbackService;
    private final ReviewRepository reviewRepository;
    private final RespondentRepository respondentRepository;
    private final MentorFeedbackRepository mentorFeedbackRepository;
    private final InterviewRepository interviewRepository;

    @Override
    public List<ReviewResponse> findAllReviewList() {
        return reviewRepository.findAllReviewResponses();
    }

    //TODO : 현재 모든 리뷰에 같은 멘토의 정보를 담아서 주는데, 따로 줄지 프론트랑 협의 후 수정
    @Override
    public List<ReviewResponse> findReviewListByMentor(Long mentorId) {
        List<Review> reviewList = reviewRepository.findAllByMentorId(mentorId)
                .orElseThrow(() -> new RuntimeException("식별자가 " + mentorId + "인 멘토 리뷰를 찾을 수 없습니다."));

        MentorResponse mentorResponse = memberService.findMentorResponseById(mentorId);
        ReviewMentorInfoResponse mentorInfoResponse = ReviewMentorInfoResponse.builder()
                .mentorId(mentorId)
                .name(mentorResponse.getName())
                .companyName(mentorResponse.getCompanyName())
                .department(mentorResponse.getDepartment())
                .profileImg(mentorResponse.getProfileImg())
                .build();
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm");

        return reviewList.stream()
                .map(review -> {
                    ReviewInfoResponse reviewInfo = ReviewInfoResponse.builder()
                            .writer(review.getMember().getName())
                            .rating(review.getRating())
                            .content(review.getContent())
                            .date(review.getDate())
                            .build();

                    return ReviewResponse.builder()
                            .reviewInfo(reviewInfo)
                            .mentorInfo(mentorInfoResponse)
                            .build();
                })
                .collect(Collectors.toList());

    }

    @Override
    public List<ReviewInfoResponse> findMyReviewByMentor(Long mentorId) {
        return reviewRepository.findReviewInfoResponsesByMentorId(mentorId);
    }

    @Override
    @Transactional
    public void createReview(Long memberId, ReviewRequest reviewRequest) {
        Respondent respondent = getRespondent(reviewRequest.getRespondentId());
        boolean isReviewCompleted = feedbackService.findIsCheckReview(respondent.getId()).isCheckReview();

        if (isReviewCompleted)
            throw new DataAlreadyExistsException("Review already exists for this respondent.");

        Interview interview = getInterview(respondent.getInterview().getId());

        Member mentor = memberService.findById(interview.getMember().getId());
        Member member = memberService.findById(memberId);

        reviewRepository.save(buildReview(member, mentor, reviewRequest));
        updateMentorFeedback(respondent);
    }

    private Respondent getRespondent(Long respondentId) {
        return respondentRepository.findById(respondentId)
                .orElseThrow(() -> new EntityNotFoundException("respondent 식별자가 " + respondentId + "인 면접 참여자 정보를 찾을 수 없습니다."));
    }

    private Interview getInterview(Long interviewId) {
        return interviewRepository.findById(interviewId)
                .orElseThrow(() -> new EntityNotFoundException("Interview 식별자가 " + interviewId + "인 면접정보를 찾을 수 없습니다."));
    }

    private void updateMentorFeedback(Respondent respondent) {
        MentorFeedback mentorFeedback = mentorFeedbackRepository.findById(respondent.getId())
                .orElseThrow(() -> new EntityNotFoundException("MentorFeedback 식별자가 respondentId 인 정보를 찾을 수 없습니다."));
        mentorFeedback.updateConfirmEvaluated();
    }

    private Review buildReview(Member member, Member mentor, ReviewRequest reviewRequest) {
        return Review.builder()
                .member(member)
                .content(reviewRequest.getContent().replace("\n", "<br>"))
                .mentor(mentor)
                .rating(reviewRequest.getRating()).build();
    }
}
