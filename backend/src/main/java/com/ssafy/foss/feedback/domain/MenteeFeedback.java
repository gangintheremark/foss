package com.ssafy.foss.feedback.domain;

import jakarta.persistence.*;
import lombok.*;

import java.io.Serializable;

@Entity
@Getter
@ToString
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class MenteeFeedback {

    @EmbeddedId
    private MenteeFeedbackId id;

    @Column(name = "feedback_text")
    private String feedbackText;

    @Column(name = "is_evaluated")
    private Boolean isEvaluated;

    public void updateConfirmEvaluated(){
        this.isEvaluated = true;
    }
}

@Embeddable
@Getter
@ToString
@AllArgsConstructor
@NoArgsConstructor
class MenteeFeedbackId implements Serializable {
    @Column(name = "schedule_id")
    private Long scheduleId;

    @Column(name = "member_id")
    private Long memberId;

    @Column(name = "mentee_id")
    private Long menteeId;
}