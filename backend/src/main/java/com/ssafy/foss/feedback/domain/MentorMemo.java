package com.ssafy.foss.feedback.domain;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import lombok.*;

@Entity
@Getter
@ToString
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class MentorMemo {
    @Column(name = "respondent_id")
    Long respondentId;
    @Column(name = "content")
    String content;
}

