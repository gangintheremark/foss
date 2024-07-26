package com.ssafy.foss.apply.repository;

import com.ssafy.foss.apply.domain.Apply;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface ApplyRepository extends JpaRepository<Apply, Long> {
    List<Apply> findByScheduleId(Long scheduleId);
    List<Apply> findByMemberId(Long memberId);
    Optional<Apply> findByScheduleIdAndMemberId(Long scheduleId, Long memberId);
    Long countByScheduleId(Long scheduleId);
    void deleteByMemberIdAndScheduleId(Long memberId, Long scheduleId);
}
