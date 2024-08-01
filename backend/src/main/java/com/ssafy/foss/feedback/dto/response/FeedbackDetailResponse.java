package com.ssafy.foss.feedback.dto.response;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class FeedbackDetailResponse {
    Long respondentId;
    String[] mentorFeedback;
    String[] aiFeedback;
    MenteeFeedbackResponse[] menteeFeedbacks;
    InterviewContentResponse interviewContent;
}
