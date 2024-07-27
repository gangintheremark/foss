package com.ssafy.foss.meetingNotification.repository;

import com.ssafy.foss.meetingNotification.domain.MeetingNotification;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface MeetingNotificationRepository extends JpaRepository<MeetingNotification, Long> {
    Optional<MeetingNotification> findBySessionIdAndMemberId(String sessionId, Long memberId);
    Optional<MeetingNotification> findByMemberId(Long memberId);
}