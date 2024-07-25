package com.ssafy.foss.career.dto;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class AddCareerRequest {
    private Long companyId;

    private String department;

    private LocalDateTime startedDate;

    private LocalDateTime endedDate;
}
