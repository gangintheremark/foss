package com.ssafy.foss.meeting.repository;

import com.ssafy.foss.meeting.domain.MeetingInfo;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface MeetingRepository extends JpaRepository<MeetingInfo, Long> {

    Optional<MeetingInfo> findBySessionId(String sessionId);
}