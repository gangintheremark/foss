package com.ssafy.foss.mentorInfo.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class MentorInfoResponse {
    private Long id;

    private String companyName;

    private String department;

    private int years;

    private String selfProduce;
}
