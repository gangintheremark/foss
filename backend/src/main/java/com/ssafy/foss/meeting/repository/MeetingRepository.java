package com.ssafy.foss.meeting.repository;

import com.ssafy.foss.meeting.domain.MeetingInfo;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import java.util.Optional;

public interface MeetingRepository extends JpaRepository<MeetingInfo, Long> {

    Optional<MeetingInfo> findBySessionId(String sessionId);

    @Modifying
    @Transactional
    @Query("DELETE FROM MeetingInfo m WHERE m.sessionId = :sessionId")
    void deleteBySessionId(String sessionId);
}