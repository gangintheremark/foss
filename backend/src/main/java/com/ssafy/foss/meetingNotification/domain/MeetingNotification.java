package com.ssafy.foss.meetingNotification.domain;

import com.ssafy.foss.meeting.domain.MeetingInfo;
import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "meeting_notifications")
@Data
public class MeetingNotification {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String sessionId;


    @Column(nullable = false)
    private Long memberId;

    @Column(nullable = false)
    private boolean hasReceivedNotification;

    @ManyToOne
    @JoinColumn(name = "meeting_id", nullable = false)
    private MeetingInfo meeting;
}
