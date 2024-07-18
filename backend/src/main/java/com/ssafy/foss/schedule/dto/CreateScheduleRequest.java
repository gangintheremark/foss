package com.ssafy.foss.schedule.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
public class CreateScheduleRequest {
    private Long mentorId;
    private String date;
}
