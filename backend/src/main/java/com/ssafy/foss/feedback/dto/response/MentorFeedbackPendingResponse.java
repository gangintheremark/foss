package com.ssafy.foss.feedback.dto.response;

import org.springframework.cglib.core.Local;

import java.time.LocalDate;
import java.util.List;

public class MentorFeedbackPendingResponse {
    Long interviewId;
    LocalDate date;
    List<FeedbackMenteeInfoResponse> menteeInfos;
}
