package com.ssafy.foss.feedback.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;

@Builder
@Data
@AllArgsConstructor
@NoArgsConstructor
public class MentorFeedbackPendingResponse {
    Long interviewId;
    LocalDateTime date;
    List<FeedbackMenteeInfoResponse> menteeInfos;
}
