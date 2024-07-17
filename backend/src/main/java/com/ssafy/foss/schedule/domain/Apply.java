package com.ssafy.foss.schedule.domain;

import jakarta.persistence.EmbeddedId;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Builder
@Getter
@AllArgsConstructor
@NoArgsConstructor
@Table(name="apply")
@Entity
public class Apply {
    @EmbeddedId
    private ApplyId applyId;
    private String fileUrl;
    private LocalDateTime createdAt;

}
