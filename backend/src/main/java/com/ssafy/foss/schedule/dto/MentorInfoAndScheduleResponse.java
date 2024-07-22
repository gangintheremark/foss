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
        private String time;
        private String name;
        private String companyName;
    }
}
