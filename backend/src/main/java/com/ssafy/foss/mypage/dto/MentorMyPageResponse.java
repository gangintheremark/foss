package com.ssafy.foss.mypage.dto;

import com.ssafy.foss.career.dto.CareerResponse;
import com.ssafy.foss.member.dto.MentorResponse;
import lombok.Builder;
import lombok.Data;

import java.util.List;

@Data
@Builder
public class MentorMyPageResponse {
    private String name;
    private String email;
    private String profileImg;
    private String role;
    private MentorInfo mentorInfo;

    @Data
    @Builder
    public static class MentorInfo {
        private String selfProduce;
        private String fileUrl;
        private List<CareerResponse> careers;
    }
}
