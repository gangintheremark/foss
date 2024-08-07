package com.ssafy.foss.feedback.domain;

import jakarta.persistence.Column;
import jakarta.persistence.EmbeddedId;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.*;

@Entity
@Getter
@ToString
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class MentorFeedback {
    @Id
    @Column(name = "respondent_id")
    private Long respondentId;

    @Column(name = "good_point")
    private String goodPoint;

    @Column(name = "bad_point")
    private String badPoint;

    @Column(name = "summary")
    private String summary;

    @Column(name = "is_evaluated")
    private Boolean isEvaluated = false;

    public void updateConfirmEvaluated(){
        this.isEvaluated = true;
    }
}
