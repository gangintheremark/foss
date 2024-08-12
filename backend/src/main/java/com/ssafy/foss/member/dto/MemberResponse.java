package com.ssafy.foss.member.dto;

import lombok.Builder;
import lombok.Data;

@Builder
@Data
public class MemberResponse {
    private String name;

    private String email;

    private String profileImg;

    private double temperature;
}
