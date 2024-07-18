package com.ssafy.foss.schedule.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.List;

@Data
@AllArgsConstructor
public class ScheduleAndApplyResponse {
    private String day;
    private List<ScheduleResponse> schedules;
}
