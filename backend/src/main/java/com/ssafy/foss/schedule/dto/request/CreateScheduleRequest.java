package com.ssafy.foss.schedule.dto.request;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class CreateScheduleRequest {
    private LocalDateTime date;
}
