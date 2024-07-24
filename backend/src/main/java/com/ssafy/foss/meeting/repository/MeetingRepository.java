package com.ssafy.foss.meeting.repository;

import com.ssafy.foss.meeting.domain.MeetingInfo;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MeetingRepository extends JpaRepository<MeetingInfo, Long> {
    MeetingInfo save(MeetingInfo meeting);
}