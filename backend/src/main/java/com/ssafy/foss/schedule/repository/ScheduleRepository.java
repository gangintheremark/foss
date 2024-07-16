package com.ssafy.foss.schedule.repository;

import com.ssafy.foss.schedule.domain.Schedule;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ScheduleRepository extends JpaRepository<Schedule, Long> {
}
