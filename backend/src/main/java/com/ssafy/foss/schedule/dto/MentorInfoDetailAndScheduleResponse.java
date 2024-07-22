package com.ssafy.foss.schedule.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.List;

@Data
@AllArgsConstructor
public class MentorInfoDetailAndScheduleResponse {
    String time;
    private List<MentorInfoDetailAndSchedule> mentors;

    @Data
    @AllArgsConstructor
    public static class MentorInfoDetailAndSchedule {
        private Long mentorId;
        private String name;
        private String companyName;
        String department;
        String profileUrl;
        int years;
        int applicantCount;
    }
}
