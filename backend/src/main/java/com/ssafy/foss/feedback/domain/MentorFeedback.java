package com.ssafy.foss.feedback.domain;

import jakarta.persistence.Column;
import jakarta.persistence.EmbeddedId;
import jakarta.persistence.Entity;
import lombok.*;

@Entity
@Getter
@ToString
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class MentorFeedback {

    @EmbeddedId
    private MentorFeedbackId id;

    @Column(name = "good_point")
    private String goodPoint;

    @Column(name = "bad_point")
    private String badPoint;

    @Column(name = "summary")
    private String summary;

}
