package com.ssafy.foss.schedule.dto.response;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.List;

@Data
@AllArgsConstructor
public class MentorTimeScheduleResponse {
    private Long scheduleId;
    private String time;
    private String mentorName;
    private List<ApplyResponse> applies;
}
