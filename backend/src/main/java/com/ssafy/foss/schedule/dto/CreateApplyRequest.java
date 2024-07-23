package com.ssafy.foss.schedule.dto;

import com.ssafy.foss.schedule.domain.ApplyId;
import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class CreateApplyRequest {
    private Long scheduleId;
    private Long memberId;
}
