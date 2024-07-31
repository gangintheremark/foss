package com.ssafy.foss.feedback.dto.response;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class FeedbackDetailResponse {
    Long scheduleId;
    String[] mentorFeedback;
    String[] aiFeedback;
    // TODO : interviewContent 추가하기
}
