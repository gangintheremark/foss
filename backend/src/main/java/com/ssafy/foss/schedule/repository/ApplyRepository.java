package com.ssafy.foss.schedule.repository;

import com.ssafy.foss.schedule.domain.Apply;
import com.ssafy.foss.schedule.domain.ApplyId;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ApplyRepository extends JpaRepository<Apply, ApplyId> {
    List<Apply> findByApplyId_ScheduleId(Long scheduleId);
}
