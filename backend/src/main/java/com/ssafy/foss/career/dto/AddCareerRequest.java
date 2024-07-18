package com.ssafy.foss.career.dto;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class AddCareerRequest {
    private String companyName;

    private String department;

    private LocalDateTime startedDate;

    private LocalDateTime endedDate;
}
