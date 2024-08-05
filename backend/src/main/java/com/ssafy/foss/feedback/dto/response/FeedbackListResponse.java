package com.ssafy.foss.feedback.dto.response;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

@Data
@AllArgsConstructor
public class FeedbackListResponse {
    private Long respondentId;
    private String date;
    private FeedbackMentorInfoResponse mentorInfo;

    public FeedbackListResponse(Long id, LocalDateTime date, FeedbackMentorInfoResponse mentorInfo) {
        this.respondentId = id;
        this.date = date.format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm"));
        this.mentorInfo = mentorInfo;
    }
}
