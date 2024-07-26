package com.ssafy.foss.respondent.dto;

import com.ssafy.foss.interview.domain.Status;
import com.ssafy.foss.member.domain.Member;
import lombok.Data;

import java.time.LocalDateTime;

@Data
public class AddInterviewRequest {
    Member member;

    private Status status;

    private LocalDateTime startedDate;
}
