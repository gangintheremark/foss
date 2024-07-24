package com.ssafy.foss.schedule.domain;

import jakarta.persistence.EmbeddedId;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Builder
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class ConfirmedApply {
    @EmbeddedId
    private ApplyId applyId;
    private String fileUrl;
    private boolean isFinished;

    public ConfirmedApply(ApplyId applyId, String fileUrl) {
        this.applyId = applyId;
        this.fileUrl = fileUrl;
    }
}
