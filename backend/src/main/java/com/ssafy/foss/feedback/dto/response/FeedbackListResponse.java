package com.ssafy.foss.feedback.dto.response;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
public class FeedbackListResponse {
    private Long scheduleId;
    private LocalDateTime date;
    private MentorInfo mentorInfo;
    private String companyLogoUrl;

    @Data
    @AllArgsConstructor
    static class MentorInfo {
        private Long mentorId;
        private String mentorName;
        private String companyName;
        private String department;
        private int years;
        private String profileImg;
    }

}
