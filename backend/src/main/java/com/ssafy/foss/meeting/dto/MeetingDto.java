package com.ssafy.foss.meeting.dto;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class MeetingDto {

    private Long id;
    private String sessionId;
    private String status;
    private LocalDateTime startTime;
    private LocalDateTime endTime;


}