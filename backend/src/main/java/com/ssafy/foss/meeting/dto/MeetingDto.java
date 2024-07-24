package com.ssafy.foss.meeting.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class MeetingDto {
    private Long id;
    private String sessionId;
    private String userName;
    private String token;
}