package com.ssafy.foss.schedule.domain;

import jakarta.persistence.Embeddable;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.io.Serializable;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Embeddable
public class ApplyId implements Serializable {
    private Long scheduleId;
    private Long memberId;
}
