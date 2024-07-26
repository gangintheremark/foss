package com.ssafy.foss.schedule.repository;

import com.ssafy.foss.member.domain.Member;
import com.ssafy.foss.schedule.domain.Apply;
import com.ssafy.foss.schedule.domain.Schedule;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface ApplyRepository extends JpaRepository<Apply, Long> {
    List<Apply> findByScheduleId(Long scheduleId);
    List<Apply> findByMemberId(Long memberId);
    Optional<Apply> findByScheduleIdAndMemberId(Long scheduleId, Long memberId);
    Long countByScheduleId(Long scheduleId);
    void deleteByMemberIdAndScheduleId(Long memberId, Long scheduleId);
}
