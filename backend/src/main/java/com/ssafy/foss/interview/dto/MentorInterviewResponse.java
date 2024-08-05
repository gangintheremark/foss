package com.ssafy.foss.interview.dto;

import lombok.Builder;
import lombok.Data;

import java.util.List;

@Data
@Builder
public class MentorInterviewResponse {
    private Long interviewId;
    private Long restDay;
    private String startedDate;
    private List<MenteeInfo> mentees;

    @Data
    @Builder
    public static class MenteeInfo {
        private String name;
        private String fileUrl;
    }
}
