package com.ssafy.foss.schedule.dto.response;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.List;

@Data
@AllArgsConstructor
public class ScheduleResponse {
    private String day;
    private List<ScheduleAndApplyResponse> schedules;
}
