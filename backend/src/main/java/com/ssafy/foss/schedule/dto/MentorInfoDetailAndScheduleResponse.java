package com.ssafy.foss.schedule.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class MentorInfoDetailAndScheduleResponse {
    private Long scheduleId;
    private String time;
    private Long mentorId;
    private String name;
    private String companyName;
    private String department;
    private String profileImg;
    private int years;
    private int applicantCount;
}
