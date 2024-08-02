package com.ssafy.foss.mypage.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class MenteeMyPageResponse {
    private String name;
    private String email;
    private String profileImg;
    private String role;
}
