package com.ssafy.foss.schedule.dto.response;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.List;

@Data
@AllArgsConstructor
public class MentorInfoAndScheduleResponse {
    private String day;
    private List<MentorInfoAndSchedule> schedules;

    @Data
    @AllArgsConstructor
    public static class MentorInfoAndSchedule {
        private String time;
        private Long applicantCount;
        private MentorInfo mentorInfo;
    }

    @Data
    @AllArgsConstructor
    public static class MentorInfo {
        private Long mentorId;
        private String name;
        private String companyName;
        private String department;
        private String profileImg;
    }
}
