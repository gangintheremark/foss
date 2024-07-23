package com.ssafy.foss.feedback.service;

import com.ssafy.foss.feedback.dto.response.FeedbackDetailResponse;

public interface FeedbackService {
    public FeedbackDetailResponse findFeedbackDetailByFeedbackId(Long scheduleId, Long memberId);
}
