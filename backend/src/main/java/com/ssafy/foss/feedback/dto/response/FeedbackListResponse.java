package com.ssafy.foss.feedback.dto.response;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
public class FeedbackListResponse {
    private Long respondentId;
    private LocalDateTime date;
    private boolean isCompleted;
    private MentorInfo mentorInfo;

    @Data
    @AllArgsConstructor
    static class MentorInfo {
        private Long mentorId;
        private String name;
        private String companyName;
        private String department;
        private String profileImg;
        private String logoImg;
    }
}
