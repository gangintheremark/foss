package com.ssafy.foss.mentorInfo.dto;

import lombok.Data;

@Data
public class AddMentorInfoRequest {
    private Long memberId;

    private String companyName;

    private String department;

    private int years;

    private String selfProduce;
}
