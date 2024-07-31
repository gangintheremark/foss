package com.ssafy.foss.feedback.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.List;

@Builder
@Data
@AllArgsConstructor
@NoArgsConstructor
public class MenteeFeedbackPendingResponse {
    Long interviewId;
    LocalDate date;
    FeedbackMentorInfoResponse mentorInfo;
    List<FeedbackMenteeInfoResponse> menteeInfos;

    public void addMenteeInfo(FeedbackMenteeInfoResponse menteeInfo) {
        this.menteeInfos.add(menteeInfo);
    }
}
