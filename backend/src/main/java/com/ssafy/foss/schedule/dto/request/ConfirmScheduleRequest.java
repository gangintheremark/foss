package com.ssafy.foss.schedule.dto.request;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.List;

@Data
@AllArgsConstructor
public class ConfirmScheduleRequest {
    private Long scheduleId;
    private List<Long> memberIds;
}
