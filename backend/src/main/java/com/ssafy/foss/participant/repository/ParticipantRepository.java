package com.ssafy.foss.participant.repository;

import com.ssafy.foss.participant.domain.Participant;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface ParticipantRepository extends JpaRepository<Participant, Long> {
    List<Participant> findByMeetingSessionId(String sessionId);
}