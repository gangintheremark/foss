package com.ssafy.foss.schedule.dto.response;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.List;

@Data
@AllArgsConstructor
public class ScheduleAndApplyResponse {
    private String day;
    private List<ScheduleAndApply> schedules;

    @Data
    @AllArgsConstructor
    public static class ScheduleAndApply {
        private Long scheduleId;
        private String time;
        private List<ApplyResponse> applies;
    }
}
