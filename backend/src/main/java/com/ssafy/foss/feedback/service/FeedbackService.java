package com.ssafy.foss.feedback.service;

import com.ssafy.foss.feedback.domain.AIFeedback;
import com.ssafy.foss.feedback.domain.MenteeFeedback;
import com.ssafy.foss.feedback.domain.MentorFeedback;
import com.ssafy.foss.feedback.dto.request.AIFeedbackRequest;
import com.ssafy.foss.feedback.dto.request.MenteeFeedbackRequest;
import com.ssafy.foss.feedback.dto.request.MentorFeedbackRequest;
import com.ssafy.foss.feedback.dto.response.FeedbackDetailResponse;

public interface FeedbackService {
    public FeedbackDetailResponse findFeedbackDetailByFeedbackId(Long scheduleId, Long memberId);

    public MenteeFeedback createMenteeFeedback(MenteeFeedbackRequest menteeFeedbackRequest, Long menteeId);

    public MentorFeedback createMentorFeedback(MentorFeedbackRequest mentorFeedbackRequest);

    public AIFeedback createAIFeedback(AIFeedbackRequest aiFeedbackRequest);
}
