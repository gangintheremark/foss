package com.ssafy.foss.meetingNotification.domain;

import com.ssafy.foss.meeting.domain.MeetingInfo;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "meeting_notifications")
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Getter
public class MeetingNotification {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "meeting_id", nullable = false)
    private MeetingInfo meeting;

    @Column(nullable = false)
    private String sessionId;


    @Column(nullable = false)
    private Long memberId;

    @Column(nullable = false)
    private boolean hasReceivedNotification=false;

    public void setHasReceivedNotification(boolean b) {
        hasReceivedNotification = b;
    }
}
