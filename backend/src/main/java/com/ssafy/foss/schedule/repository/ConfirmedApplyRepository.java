package com.ssafy.foss.schedule.repository;

import com.ssafy.foss.schedule.domain.ApplyId;
import com.ssafy.foss.schedule.domain.ConfirmedApply;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ConfirmedApplyRepository extends JpaRepository<ConfirmedApply, ApplyId> {
    List<ConfirmedApply> findByApplyId_ScheduleId(Long scheduleId);
    List<ConfirmedApply> findByApplyId_MemberId(Long memberId);
}
