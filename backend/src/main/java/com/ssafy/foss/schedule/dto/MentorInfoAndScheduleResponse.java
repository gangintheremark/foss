package com.ssafy.foss.schedule.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.List;

@Data
@AllArgsConstructor
public class MentorInfoAndScheduleResponse {
    private String date;
    private List<MentorInfo> mentorInfoList;

    @Data
    private class MentorInfo {
        private String name;
        private String companyName;
    }
}
