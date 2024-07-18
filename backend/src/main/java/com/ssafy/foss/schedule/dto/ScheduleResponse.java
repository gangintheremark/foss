package com.ssafy.foss.schedule.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.List;

@Data
@AllArgsConstructor
public class ScheduleResponse {
    private String day;
    private List<ScheduleAndApplyResponse> schedules;
}
