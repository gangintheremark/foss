package com.ssafy.foss.interview.domain;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public enum Status {
    WAIT("WAIT"),
    START("START"),
    END("END");

    private String value;
}
