package com.ssafy.foss.member.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class MentorResponse {
    private String name;

    private String profileImg;

    private String selfProduce;

    private String companyName;

    private String logoImg;

    private String department;

    private String fileUrl;

}
