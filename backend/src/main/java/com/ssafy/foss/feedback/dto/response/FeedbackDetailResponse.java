package com.ssafy.foss.feedback.dto.response;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.List;

@Data
@AllArgsConstructor
public class FeedbackDetailResponse {
    Long scheduleId;
    String[] mentorFeedback;
    List<MenteeFeedbackResponse> menteeFeedback;
    String[] aiFeedback;
    // TODO : interviewContent 추가하기

    @Data
    @AllArgsConstructor
    public static class MenteeFeedback {
        Long memberId;
        String content;
        boolean isEvaluated;
    }

}
