package com.ssafy.foss.schedule.repository;

import com.ssafy.foss.schedule.domain.Schedule;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

public interface ScheduleRepository extends JpaRepository<Schedule, Long> {
    List<Schedule> findScheduleByMentorId(Long mentorId);
    List<Schedule> findScheduleByMentorIdAndDateBetween(Long mentorId, LocalDateTime startDate, LocalDateTime endDate);
    List<Schedule> findScheduleByDateBetweenAndIsConfirmedFalse(LocalDateTime startDate, LocalDateTime endDate);
    Optional<Schedule> findScheduleByMentorIdAndDate(Long mentorId, LocalDateTime date);
}
