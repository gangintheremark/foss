package com.ssafy.foss.schedule.repository;

import com.ssafy.foss.member.domain.Member;
import com.ssafy.foss.schedule.domain.Schedule;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

public interface ScheduleRepository extends JpaRepository<Schedule, Long> {
    List<Schedule> findScheduleByMemberId(Long memberId);
    List<Schedule> findByMemberIdAndDateBetween(Long memberId, LocalDateTime startDate, LocalDateTime endDate);
    List<Schedule> findByDateBetween(LocalDateTime startDate, LocalDateTime endDate);
    Optional<Schedule> findByMemberIdAndDate(Long memberId, LocalDateTime date);
}
