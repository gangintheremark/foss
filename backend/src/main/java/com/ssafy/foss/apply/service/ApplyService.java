package com.ssafy.foss.apply.service;

import com.ssafy.foss.apply.domain.Apply;
import com.ssafy.foss.apply.repository.ApplyRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@RequiredArgsConstructor
@Service
public class ApplyService {
    private final ApplyRepository applyRepository;

    public List<Apply> findByScheduleId(Long scheduleId) {
        return applyRepository.findByScheduleId(scheduleId);
    }

    public List<Apply> findByMemberId(Long memberId) {
        return  applyRepository.findByMemberId(memberId);
    }

    public boolean IsExistByScheduleIdAndMemberId(Long scheduleId, Long memberId) {
        return applyRepository.findByScheduleIdAndMemberId(scheduleId, memberId).isPresent();
    }

    public Apply findByScheduleIdAndMemberId(Long scheduleId, Long memberId) {
        return applyRepository.findByScheduleIdAndMemberId(scheduleId, memberId).orElseThrow();
    }

    public Apply saveApply(Apply apply) {
        return applyRepository.save(apply);
    }

    public void deleteAll(List<Apply> applies) {
        applyRepository.deleteAll(applies);
    }

    public void deleteByMemberIdAndScheduleId(Long memberId, Long scheduleId) {
        applyRepository.deleteByMemberIdAndScheduleId(memberId, scheduleId);
    }

    public Long countByScheduleId(Long scheduleId) {
        return applyRepository.countByScheduleId(scheduleId);
    }
}
