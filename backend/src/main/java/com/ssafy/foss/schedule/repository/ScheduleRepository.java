package com.ssafy.foss.schedule.repository;

import com.ssafy.foss.schedule.domain.Schedule;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

public interface ScheduleRepository extends JpaRepository<Schedule, Long> {
    List<Schedule> findScheduleByMemberId(Long memberId);
    List<Schedule> findScheduleByMemberIdAndDateBetween(Long memberId, LocalDateTime startDate, LocalDateTime endDate);
    List<Schedule> findScheduleByDateBetweenAndIsConfirmedFalse(LocalDateTime startDate, LocalDateTime endDate);
    Optional<Schedule> findScheduleByMemberIdAndDate(Long memberId, LocalDateTime date);
}
