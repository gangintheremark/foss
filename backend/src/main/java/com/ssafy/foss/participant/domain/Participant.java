package com.ssafy.foss.participant.domain;

import com.ssafy.foss.meeting.domain.MeetingInfo;
import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "participants")
@Data
public class Participant {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long participantId;

    @Column(nullable = false)
    private String name;


    @Column(nullable = false)
    private Long memberId;

    @Column(nullable = false)
    private String role; // 'host' or 'participant'

    @Column(nullable = false)
    private boolean isMuted;

    @Column(nullable = false)
    private boolean isCameraOn;

    @ManyToOne
    @JoinColumn(name = "meeting_id", nullable = false)
    private MeetingInfo meeting;
}