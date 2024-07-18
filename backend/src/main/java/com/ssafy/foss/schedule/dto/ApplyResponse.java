package com.ssafy.foss.schedule.dto;

import com.ssafy.foss.schedule.domain.Apply;
import com.ssafy.foss.schedule.domain.ConfirmedApply;
import lombok.Data;

@Data
public class ApplyResponse {
    private Long memberId;
    private String name;
    private String fileUrl;

    public ApplyResponse(Apply apply, String name) {
        this.memberId = apply.getApplyId().getMemberId();
        this.name = name;
        this.fileUrl = apply.getFileUrl();
    }

    public ApplyResponse(ConfirmedApply apply, String name) {
        this.memberId = apply.getApplyId().getMemberId();
        this.name = name;
        this.fileUrl = apply.getFileUrl();
    }
}
