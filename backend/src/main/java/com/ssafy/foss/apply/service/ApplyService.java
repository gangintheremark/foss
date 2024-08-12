package com.ssafy.foss.apply.service;

import com.ssafy.foss.apply.domain.Apply;
import com.ssafy.foss.apply.repository.ApplyRepository;
import com.ssafy.foss.s3.service.AwsS3Service;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@RequiredArgsConstructor
@Service
public class ApplyService {
    private final ApplyRepository applyRepository;
    private final AwsS3Service awsS3Service;

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
//        for(Apply apply : applies) {
//            awsS3Service.deleteFile(apply.getFileUrl());
//        }
        applyRepository.deleteAll(applies);
    }

    public void deleteByScheduleId(Long scheduleId) {
        List<Apply> applies = applyRepository.findByScheduleId(scheduleId);
        for(Apply apply : applies) {
            awsS3Service.deleteFile(apply.getFileUrl());
        }
        applyRepository.deleteByScheduleId(scheduleId);
    }
    public void deleteByMemberIdAndScheduleId(Long memberId, Long scheduleId) {
        Apply apply = applyRepository.findByScheduleIdAndMemberId(scheduleId, memberId).orElseThrow(
                ()->  new RuntimeException("해당 회원이 신청한 일정이 없습니다.")
        );
        awsS3Service.deleteFile(apply.getFileUrl());
        applyRepository.delete(apply);
    }

    public Long countByScheduleId(Long scheduleId) {
        return applyRepository.countByScheduleId(scheduleId);
    }
}
