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
        private String time;
        private Long scheduleId;
        @JsonProperty("isConfirmed")
        private boolean isConfirmed;
        private List<ApplyResponse> applies;
    }
}
