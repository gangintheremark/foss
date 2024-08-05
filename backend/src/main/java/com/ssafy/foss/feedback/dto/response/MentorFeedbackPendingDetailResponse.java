package com.ssafy.foss.feedback.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;

@Builder
@Data
@AllArgsConstructor
@NoArgsConstructor
public class MentorFeedbackPendingDetailResponse {
    Long interviewId;
    String date;
    List<MentorFeedbackPendingMenteeInfoResponse> menteeInfos;

    public MentorFeedbackPendingDetailResponse(Long interviewId, LocalDateTime date) {
        this.interviewId = interviewId;
        this.date = date.format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm"));
        menteeInfos = new ArrayList<MentorFeedbackPendingMenteeInfoResponse>();
    }
}
