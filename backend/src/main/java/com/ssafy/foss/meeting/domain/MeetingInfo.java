package com.ssafy.foss.meeting.domain;

import jakarta.persistence.*;
import lombok.Data;
import lombok.Getter;

import java.time.LocalDateTime;

@Entity
@Table(name = "meetings")
@Getter
public class MeetingInfo {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)
    private String sessionId;

    @Column(nullable = false)
    private String status = "ongoing";

    @Column(nullable = true)
    private LocalDateTime startTime;

    @Column(nullable = true)
    private LocalDateTime endTime;

    public void setStatus(String status) {
        this.status = status;
    }

    public void setEndTime(LocalDateTime now) {
        this.endTime = now;
    }

    public void setSessionId(String sessionId) {
        this.sessionId = sessionId;
    }
}