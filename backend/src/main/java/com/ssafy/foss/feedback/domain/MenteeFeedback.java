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

    @Column(name = "content")
    private String content;

    @Column(name = "is_evaluated")
    private Boolean isEvaluated;

    public void updateConfirmEvaluated(){
        this.isEvaluated = true;
    }
}

