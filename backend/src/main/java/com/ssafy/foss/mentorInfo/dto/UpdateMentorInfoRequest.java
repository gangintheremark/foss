package com.ssafy.foss.mentorInfo.dto;

import lombok.Data;

@Data
public class UpdateMentorInfoRequest {
    private Long id;

    private String selfProduce;
}
