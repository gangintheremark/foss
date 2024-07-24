package com.ssafy.foss.schedule.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.List;

@Data
@AllArgsConstructor
public class MentorScheduleResponse {
    private String day;
    private List<ScheduleInfo> schedules;

    @Data
    @AllArgsConstructor
    public static class ScheduleInfo {
        private Long scheduleId;
        private String time;
        @JsonProperty("isConfirmed")
        private boolean isConfirmed;
    }
}
