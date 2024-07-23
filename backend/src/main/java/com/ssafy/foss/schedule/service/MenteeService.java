package com.ssafy.foss.schedule.service;

import com.ssafy.foss.notification.domain.Notification;
import com.ssafy.foss.notification.domain.Type;
import com.ssafy.foss.notification.service.NotificationService;
import com.ssafy.foss.member.domain.Member;
import com.ssafy.foss.member.repository.MemberRepository;
import com.ssafy.foss.schedule.domain.Apply;
import com.ssafy.foss.schedule.domain.ApplyId;
import com.ssafy.foss.schedule.domain.Schedule;
import com.ssafy.foss.schedule.repository.ApplyRepository;
import com.ssafy.foss.schedule.repository.ScheduleRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RequiredArgsConstructor
@Service
@Transactional(readOnly = true)
public class MenteeService {
    private final ApplyRepository applyRepository;
    private final ScheduleRepository scheduleRepository;
    private final MemberRepository memberRepository;
    private final NotificationService notificationService;

    // TODO : S3 fileUpload 코드 추가
    @Transactional
    public Apply createApply(Long memberId, Long scheduleId, MultipartFile file) {
        checkIfApplyExists(scheduleId, memberId);

        Schedule schedule = scheduleRepository.findById(scheduleId)
                .orElseThrow(() -> new RuntimeException("식별자가 " + scheduleId + "인 일정이 없습니다."));

        checkIfScheduleConflict(memberId, schedule);

        String fileUrl = "http://example.com/file3.pdf"; // TODO : 나중에 제거
        // String fileUrl = s3Service.fileUpload(null, file);

        Member sender = memberRepository.findById(memberId)
                .orElseThrow(() -> new RuntimeException("식별자가 " + memberId + "인 일정이 없습니다."));

        Notification notification = Notification.builder()
                .senderId(memberId)
                .receiverId(schedule.getMentorId())
                .type(Type.APPLY)
                .content(sender.getName() + "님이 면접을 신청하셨습니다!")
                .targetUrl(null)
                .isRead(false).build();

        notificationService.create(notification);
        return applyRepository.save(buildApply(scheduleId, memberId, fileUrl));
    }

    private void checkIfApplyExists(Long scheduleId, Long memberId) {
        if (applyRepository.findByApplyId_ScheduleIdAndApplyId_MemberId(scheduleId, memberId).isPresent()) {
            throw new RuntimeException("이미 신청하신 일정입니다.");
        }
    }

    private void checkIfScheduleConflict(Long memberId, Schedule newSchedule) {
        List<Apply> applies = applyRepository.findByApplyId_MemberId(memberId);

        for (Apply apply : applies) {
            Schedule appliedSchedule = scheduleRepository.findById(apply.getApplyId().getScheduleId())
                    .orElseThrow(() -> new RuntimeException("식별자가 " + apply.getApplyId().getScheduleId() + "인 일정을 찾을 수 없습니다."));
            if (newSchedule.getDate().equals(appliedSchedule.getDate())) {
                throw new RuntimeException("동일한 시간에 신청한 일정이 있습니다.");
            }
        }
    }

    private Apply buildApply(Long scheduleId, Long memberId, String fileUrl) {
        return Apply.builder()
                .applyId(new ApplyId(scheduleId, memberId))
                .fileUrl(fileUrl)
                .build();
    }
}
