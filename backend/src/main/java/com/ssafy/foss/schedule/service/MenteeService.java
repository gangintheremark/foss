package com.ssafy.foss.schedule.service;

import com.ssafy.foss.notification.domain.Notification;
import com.ssafy.foss.notification.domain.Type;
import com.ssafy.foss.notification.service.NotificationService;
import com.ssafy.foss.member.domain.Member;
import com.ssafy.foss.member.repository.MemberRepository;
import com.ssafy.foss.schedule.domain.Apply;
import com.ssafy.foss.schedule.domain.ApplyId;
import com.ssafy.foss.schedule.domain.Schedule;
import com.ssafy.foss.schedule.dto.CreateApplyRequest;
import com.ssafy.foss.schedule.repository.ApplyRepository;
import com.ssafy.foss.schedule.repository.ScheduleRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

@RequiredArgsConstructor
@Service
@Transactional(readOnly = true)
public class MenteeService {
    private final ApplyRepository applyRepository;
    private final ScheduleRepository scheduleRepository;
    private final MemberRepository memberRepository;
    private final NotificationService notificationService;

    @Transactional
    public Apply createApply(CreateApplyRequest request, MultipartFile file) {
        String fileUrl = "http://example.com/file3.pdf";

        Schedule schedule = scheduleRepository.findById(request.getScheduleId())
                .orElseThrow(() -> new RuntimeException("Schedule not found"));
        Member sender = memberRepository.findById(request.getMemberId())
                .orElseThrow(() -> new RuntimeException("Member not found"));

        Notification notification = Notification.builder()
                .senderId(request.getMemberId())
                .receiverId(schedule.getMentorId())
                .type(Type.APPLY)
                .content(sender.getName() + "님이 면접을 신청하셨습니다!")
                .targetUrl(null)
                .isRead(false).build();

        // String fileUrl = s3Service.fileUpload(null, file);
        notificationService.create(notification);
        return applyRepository.save(buildApply(request.getScheduleId(), request.getMemberId(), fileUrl));
    }

    private Apply buildApply(Long scheduleId, Long memberId, String fileUrl) {
        return Apply.builder()
                .applyId(new ApplyId(scheduleId, memberId))
                .fileUrl(fileUrl)
                .build();
    }

}
