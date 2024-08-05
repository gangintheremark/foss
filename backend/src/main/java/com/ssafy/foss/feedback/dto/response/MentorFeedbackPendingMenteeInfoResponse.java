package com.ssafy.foss.feedback.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Builder
@Data
@AllArgsConstructor
@NoArgsConstructor
public class MentorFeedbackPendingMenteeInfoResponse {
    Long menteeId;
    String name;
    String[] feedback;

    public MentorFeedbackPendingMenteeInfoResponse(Long menteeId, String name, String goodPoint, String badPoint, String summary) {
        this.menteeId = menteeId;
        this.name = name;
        this.feedback = new String[]{goodPoint, badPoint, summary};
    }
}
