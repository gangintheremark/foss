package com.ssafy.foss.schedule.dto.response;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.List;

@Data
@AllArgsConstructor
public class MenteeScheduleResponse {
    private String day;
    private List<MentorInfoAndSchedule> schedules;

    @Data
    @AllArgsConstructor
    public static class MentorInfoAndSchedule {
        private Long scheduleId;
        private String time;
        private MentorInfo mentorInfo;
    }

    @Data
    @AllArgsConstructor
    public static class MentorInfo {
        private String name;
        private String companyName;
        private String department;
        private String profileImg;
        private String fileUrl;
    }
}
