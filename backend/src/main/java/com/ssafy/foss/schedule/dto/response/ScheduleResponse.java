package com.ssafy.foss.schedule.dto.response;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.List;

@Data
@AllArgsConstructor
public class ScheduleResponse {
    private String day;
    private List<ScheduleInfo> scheduleInfo;

    @Data
    @AllArgsConstructor
    public static class ScheduleInfo {
        private Long scheduleId;
        private String time;
    }
}
