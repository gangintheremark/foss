package com.ssafy.foss.member.domain;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public enum Role {
    MENTEE("ROLE_MENTEE"),
    MENTOR("ROLE_MENTOR");

    private String value;
}
