package com.ssafy.foss.feedback.domain;

import com.ssafy.foss.schedule.domain.ApplyId;
import com.ssafy.foss.util.BaseTimeEntity;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Feedback extends BaseTimeEntity {
    @EmbeddedId
    private ApplyId applyId;

    private String content;
}
