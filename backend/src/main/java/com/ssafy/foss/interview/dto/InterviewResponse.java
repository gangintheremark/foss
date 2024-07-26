package com.ssafy.foss.interview.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class InterviewResponse {
    private String name;

    private String status;

    private String startedDate;
}

