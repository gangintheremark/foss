package com.ssafy.foss.feedback.domain;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

import java.io.Serializable;

@Embeddable
@Getter
@ToString
@AllArgsConstructor
@NoArgsConstructor
public class AIFeedbackId implements Serializable {
    @Column(name = "schedule_id")
    private Long scheduleId;

    @Column(name = "member_id")
    private Long memberId;
}
