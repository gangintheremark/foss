package com.ssafy.foss.feedback.service;

import com.ssafy.foss.feedback.domain.MenteeFeedback;
import com.ssafy.foss.feedback.dto.request.MenteeFeedbackRequest;
import com.ssafy.foss.feedback.dto.response.FeedbackDetailResponse;

public interface FeedbackService {
    public FeedbackDetailResponse findFeedbackDetailByFeedbackId(Long scheduleId, Long memberId);

    public MenteeFeedback createMenteeFeedback(MenteeFeedbackRequest menteeFeedbackRequest, Long menteeId);
}
