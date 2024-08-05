package com.ssafy.foss.member.dto;

import lombok.Builder;
import lombok.Data;

@Builder
@Data
public class MentorCardResponse {
    private Long memberId;

    private String name;

    private String profileImg;

    private String selfProduce;

    private String companyName;

    private String logoImg;

    private String department;

    private Integer interviewCnt;

    private Double rating;
}
