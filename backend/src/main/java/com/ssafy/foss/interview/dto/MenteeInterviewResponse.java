package com.ssafy.foss.interview.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class MenteeInterviewResponse {
    private Long interviewId;
    private Long restDay;
    private String startedDate;
    private String fileUrl;
    private MentorInfo mentorInfo;

    @Data
    @Builder
    public static class MentorInfo {
        private String name;
        private String companyName;
        private String department;
    }
}
