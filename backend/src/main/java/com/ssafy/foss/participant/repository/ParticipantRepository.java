package com.ssafy.foss.participant.repository;

import com.ssafy.foss.participant.domain.Participant;
import io.lettuce.core.dynamic.annotation.Param;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface ParticipantRepository extends JpaRepository<Participant, Long> {
    List<Participant> findByMeeting_Id(Long meetingId);


    @Modifying
    @Transactional
    @Query("DELETE FROM Participant p WHERE p.id = :memberId")
    void deleteById(@Param("memberId") Long memberId);

    @Modifying
    @Transactional
    @Query("DELETE FROM Participant p WHERE p.meeting.id = :meetingId")
    void deleteByMeetingId(@Param("meetingId") Long meetingId);


}