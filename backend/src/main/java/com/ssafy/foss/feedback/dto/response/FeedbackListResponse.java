package com.ssafy.foss.feedback.dto.response;

import com.ssafy.foss.mentorInfo.dto.MentorInfoResponse;
import lombok.AllArgsConstructor;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
public class FeedbackListResponse {
    private Long respondentId;
    private LocalDateTime date;
    private FeedbackMentorInfoResponse mentorInfo;
}
