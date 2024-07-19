package com.ssafy.foss.mentorInfo.dto;

import lombok.Data;

@Data
public class UpdateMentorInfoRequest {
    private Long id;

    private String companyName;

    private String department;

    private int years;

    private String selfProduce;
}
