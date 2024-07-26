package com.ssafy.foss.interview.dto;

import lombok.Builder;
import lombok.Data;

import java.util.List;

@Data
@Builder
public class InterviewDetailResponse {
    private Long interviewId;

    private String startedDate;

    private List<Long> respondents;
}

