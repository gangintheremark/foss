package com.ssafy.foss.feedback.dto.request;

import lombok.Builder;
import lombok.Data;

import java.util.List;

@Builder
@Data
public class InterviewMentorFeedbackRequest {
    Long interviewId;
    List<MentorFeedbackRequest> feedbacks;
}
