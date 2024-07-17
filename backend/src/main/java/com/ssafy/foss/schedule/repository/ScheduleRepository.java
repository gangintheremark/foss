package com.ssafy.foss.schedule.repository;

import com.ssafy.foss.schedule.domain.Schedule;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDateTime;
import java.util.List;

public interface ScheduleRepository extends JpaRepository<Schedule, Long> {
    List<Schedule> findScheduleByMentorIdAndDateBetween(Long mentorId, LocalDateTime startDate, LocalDateTime endDate);
}
