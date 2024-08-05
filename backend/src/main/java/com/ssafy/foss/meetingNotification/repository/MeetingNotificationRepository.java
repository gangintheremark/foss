package com.ssafy.foss.meetingNotification.repository;

import com.ssafy.foss.meetingNotification.domain.MeetingNotification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import jakarta.transaction.Transactional;

import java.util.List;
import java.util.Optional;

public interface MeetingNotificationRepository extends JpaRepository<MeetingNotification, Long> {

    @Query("SELECT mn FROM MeetingNotification mn WHERE mn.sessionId = :sessionId AND mn.memberId = :memberId")
    Optional<MeetingNotification> findBySessionIdAndMemberId(@Param("sessionId") String sessionId, @Param("memberId") Long memberId);

    @Query("SELECT mn FROM MeetingNotification mn WHERE mn.memberId = :memberId")
    Optional<MeetingNotification> findByMemberId(@Param("memberId") Long memberId);

    @Modifying
    @Transactional
    @Query("DELETE FROM MeetingNotification mn WHERE mn.sessionId = :sessionId")
    void deleteAllBySessionId(@Param("sessionId") String sessionId);
}
