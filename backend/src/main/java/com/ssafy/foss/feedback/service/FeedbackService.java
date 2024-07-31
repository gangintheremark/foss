package com.ssafy.foss.feedback.service;

import com.ssafy.foss.feedback.domain.AIFeedback;
import com.ssafy.foss.feedback.domain.MentorFeedback;
import com.ssafy.foss.feedback.dto.request.*;
import com.ssafy.foss.feedback.dto.response.FeedbackDetailResponse;
import com.ssafy.foss.feedback.dto.response.FeedbackListResponse;
import com.ssafy.foss.feedback.dto.response.MenteeFeedbackPendingResponse;
import com.ssafy.foss.feedback.dto.response.MentorFeedbackPendingResponse;

import java.util.List;

public interface FeedbackService {

    // 멘티) 내 피드백 리스트 조회
    public List<FeedbackListResponse> findFeedbackListByMenteeId(Long memberId);

    // 멘티) 피드백 상세 조회
    public FeedbackDetailResponse findFeedbackDetailByFeedbackId(Long respondentId);

    // 멘티) 내가 작성해야하는 다른 멘티들의 피드백 리스트
    public List<MenteeFeedbackPendingResponse> findPendingMenteeFeedback(Long memberId);

    // 멘티) 다른 멘티 피드백 작성
    public void createMenteeFeedback(List<MenteeFeedbackRequest> menteeFeedbackRequests, Long memberId);

    // 멘티) 나에게 피드백해준 다른 멘티 평가
    public void updateMenteeEvaluate(FeedbackRatingRequest feedbackRatingRequest, Long memberId);

    // 멘토) 내 면접에 참여한 모든 멘티들 피드백 작성
    public MentorFeedback createMentorFeedback(MentorFeedbackRequest mentorFeedbackRequest);

    // 멘토) 작성 대기중인 피드백 리스트 조회
    public List<MentorFeedbackPendingResponse> findPendingMentorFeedback(Long mentorId);

    // 멘토) 메모장 작성
    public void createMentorMemo(MentorMemoRequest mentorMemoRequest);

    // 멘티) STT 결과 보내기
    public void createInterviewContent(InterviewContentRequest interviewContentRequest);

    // AI) AI 피드백 작성
    public AIFeedback createAIFeedback(AIFeedbackRequest aiFeedbackRequest);
}
