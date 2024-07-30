package com.ssafy.foss.participant.dto;

import lombok.Data;

@Data
public class ParticipantDto {

    private Long memberId;
    private String name;
    private String role; // 'host' or 'participant'
    private boolean isMuted;
    private boolean isCameraOn;
}