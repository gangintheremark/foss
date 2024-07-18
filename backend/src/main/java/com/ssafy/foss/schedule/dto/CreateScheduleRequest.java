package com.ssafy.foss.schedule.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Getter
public class CreateScheduleRequest {
    private Long mentorId;
    private String date;
}
