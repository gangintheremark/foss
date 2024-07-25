package com.ssafy.foss.schedule.repository;

import com.ssafy.foss.schedule.domain.Apply;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ApplyRepository extends JpaRepository<Apply, Long> {
    List<Apply> findByScheduleId(Long scheduleId);
    Long countByScheduleId(Long scheduleId);
}
