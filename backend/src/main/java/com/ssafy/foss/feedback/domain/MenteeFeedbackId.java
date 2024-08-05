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
public class MenteeFeedbackId implements Serializable {
    @Column(name = "respondent_id")
    private Long respondentId;

    @Column(name = "mentee_id")
    private Long menteeId;
}
