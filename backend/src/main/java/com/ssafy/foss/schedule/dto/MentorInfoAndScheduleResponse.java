package com.ssafy.foss.schedule.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.List;

@Data
@AllArgsConstructor
public class MentorInfoAndScheduleResponse {
    private String date;
    private List<MentorInfoAndSchedule> mentors;

    @Data
    @AllArgsConstructor
    public static class MentorInfoAndSchedule {
        private Long memberId;
        private String time;
        private String name;
        private String companyName;
        private String department;
        private String profileImg;
        private int years;
        private Long applicantCount;
    }
}
