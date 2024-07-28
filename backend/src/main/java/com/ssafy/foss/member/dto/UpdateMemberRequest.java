package com.ssafy.foss.member.dto;

import lombok.Builder;
import lombok.Data;

@Builder
@Data
public class UpdateMemberRequest {
    private String name;
    private String email;
}
