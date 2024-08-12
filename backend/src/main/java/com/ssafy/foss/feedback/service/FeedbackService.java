package com.ssafy.foss.feedback.service;

import com.ssafy.foss.feedback.dto.request.*;
import com.ssafy.foss.feedback.dto.response.FeedbackDetailResponse;
import com.ssafy.foss.feedback.dto.response.FeedbackListResponse;

import java.util.List;

public interface FeedbackService {

    // 멘티) 내 피드백 리스트 조회 (완료)
    public List<FeedbackListResponse> findFeedbackListByMenteeId(Long memberId);

    // 멘티) 피드백 상세 조회 (완료)
    public FeedbackDetailResponse findFeedbackDetailByFeedbackId(Long respondentId);

    // 멘티) 다른 멘티 피드백 작성 (완료)
    public void createMenteeFeedback(InterviewMenteeFeedbackRequest interviewMenteeFeedbackRequest, Long memberId);

    // 멘티) 나에게 피드백해준 다른 멘티 평가 (완료)
    public void updateMenteeEvaluate(FeedbackRatingRequest feedbackRatingRequest);

    // 멘토) 피드백 작성(완료)
    public void createMentorFeedback(InterviewMentorFeedbackRequest interviewMentorFeedback);

    public boolean findIsCheckReview(Long respondentId);
}
