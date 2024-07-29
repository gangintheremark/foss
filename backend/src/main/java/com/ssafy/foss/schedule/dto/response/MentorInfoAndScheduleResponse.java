package com.ssafy.foss.schedule.dto.response;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.List;

@Data
@AllArgsConstructor
public class MentorInfoAndScheduleResponse {
    private String day;
    private List<MentorInfoAndSchedule> mentors;

    @Data
    @AllArgsConstructor
    public static class MentorInfoAndSchedule {
        private Long mentorId;
        private String time;
        private String mentorName;
        private String companyName;
        private String department;
        private String profileImg;
        private Long applicantCount;
    }
}
