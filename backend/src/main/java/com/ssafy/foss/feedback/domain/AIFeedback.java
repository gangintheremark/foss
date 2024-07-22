package com.ssafy.foss.feedback.domain;

import jakarta.persistence.*;
import lombok.*;


@Entity
@Getter
@ToString
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class AIFeedback {

    @EmbeddedId
    private AIFeedbackId id;

    @Column(name = "good_point")
    private String goodPoint;

    @Column(name = "bad_point")
    private String badPoint;

    @Column(name = "summary")
    private String summary;
}

