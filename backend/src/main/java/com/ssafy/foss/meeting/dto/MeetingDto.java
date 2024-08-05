package com.ssafy.foss.meeting.dto;

import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@Builder
public class MeetingDto {
    private Long id;

    private String sessionId;

    private String status;

    private LocalDateTime startTime;

    private LocalDateTime endTime;
}