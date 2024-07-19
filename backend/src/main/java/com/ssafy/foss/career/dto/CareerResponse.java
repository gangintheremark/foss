package com.ssafy.foss.career.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class CareerResponse {
    private String companyName;

    private String department;

    private String startedDate;

    private String endedDate;
}

