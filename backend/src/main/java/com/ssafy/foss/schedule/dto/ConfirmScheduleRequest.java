package com.ssafy.foss.schedule.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.List;

@Data
@AllArgsConstructor
public class ConfirmScheduleRequest {
    private Long scheduleId;
    private List<Long> memberIds;
}
