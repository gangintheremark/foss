package com.ssafy.foss.schedule.dto.response;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class ApplyResponse {
    private Long memberId;
    private String name;
    private String fileUrl;
    private double temperature;
}
