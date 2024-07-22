package com.ssafy.foss.feedback.domain;

import jakarta.persistence.*;
import lombok.*;

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

