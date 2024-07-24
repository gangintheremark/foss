package com.ssafy.foss.schedule.service;

import com.ssafy.foss.mentorInfo.domain.MentorInfo;
import com.ssafy.foss.mentorInfo.repository.MentorInfoRepository;
import com.ssafy.foss.notification.domain.Notification;
import com.ssafy.foss.notification.domain.Type;
import com.ssafy.foss.notification.service.NotificationService;
import com.ssafy.foss.member.domain.Member;
import com.ssafy.foss.member.repository.MemberRepository;
import com.ssafy.foss.schedule.domain.Apply;
import com.ssafy.foss.schedule.domain.ApplyId;
import com.ssafy.foss.schedule.domain.ConfirmedApply;
import com.ssafy.foss.schedule.domain.Schedule;
import com.ssafy.foss.schedule.dto.response.MenteeScheduleResponse;
import com.ssafy.foss.schedule.dto.response.MentorScheduleResponse;
import com.ssafy.foss.schedule.repository.ApplyRepository;
import com.ssafy.foss.schedule.repository.ConfirmedApplyRepository;
import com.ssafy.foss.schedule.repository.ScheduleRepository;
import com.ssafy.foss.util.DateUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@Service
@Transactional(readOnly = true)
public class MenteeService {
    private final ApplyRepository applyRepository;
    private final ConfirmedApplyRepository confirmedApplyRepository;
    private final ScheduleRepository scheduleRepository;
    private final MemberRepository memberRepository;
    private final MentorInfoRepository mentorInfoRepository;
    private final NotificationService notificationService;

    public List<MenteeScheduleResponse> findScheduleByMemberId(int month, Long memberId) {
        DateUtil.validateMonth(month);

        List<Apply> applies = applyRepository.findByApplyId_MemberId(memberId);
        List<ConfirmedApply> confirmedApplies = confirmedApplyRepository.findByApplyId_MemberId(memberId);

        List<Long> scheduleIds = extractScheduleIds(applies, confirmedApplies);

        List<Schedule> schedules = scheduleRepository.findAllById(scheduleIds);

        return mapToMenteeScheduleResponse(groupMenteeSchedulesByDate(schedules));

    }

    // TODO : S3 fileUpload 코드 추가
    @Transactional
    public Apply createApply(Long memberId, Long scheduleId, MultipartFile file) {
        checkIfApplyExists(scheduleId, memberId);

        Schedule schedule = scheduleRepository.findById(scheduleId)
                .orElseThrow(() -> new RuntimeException("식별자가 " + scheduleId + "인 일정을 찾을 수 없습니다."));

        checkIfScheduleConflict(memberId, schedule);

        String fileUrl = "http://example.com/file3.pdf"; // TODO : 나중에 제거
        // String fileUrl = s3Service.fileUpload(null, file);

        Member sender = memberRepository.findById(memberId)
                .orElseThrow(() -> new RuntimeException("식별자가 " + memberId + "인 회원을 찾을 수 없습니다."));

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

    public List<MentorScheduleResponse> findScheduleByMentorId(Long mentorId) {
        return mapToMentorScheduleResponse(groupSchedulesByDate(scheduleRepository.findScheduleByMentorId(mentorId)));
    }

    @Transactional
    public void deleteApply(Long scheduleId, Long memberId) {
        applyRepository.deleteById(new ApplyId(scheduleId, memberId));
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

    private List<Long> extractScheduleIds(List<Apply> applies, List<ConfirmedApply> confirmedApplies) {
        List<Long> scheduleIds = applies.stream()
                .map(apply -> apply.getApplyId().getScheduleId())
                .collect(Collectors.toList());
        scheduleIds.addAll(confirmedApplies.stream()
                .map(confirmedApply -> confirmedApply.getApplyId().getScheduleId())
                .collect(Collectors.toList()));
        return scheduleIds;
    }


    private Map<String, List<MentorScheduleResponse.ScheduleInfo>> groupSchedulesByDate(List<Schedule> schedules) {
        return schedules.stream().collect(Collectors.groupingBy(
                schedule -> schedule.getDate().toLocalDate().toString(),
                Collectors.mapping(schedule -> {
                    return new MentorScheduleResponse.ScheduleInfo(schedule.getScheduleId(), schedule.getDate().toLocalTime().toString(), schedule.isConfirmed());
                }, Collectors.toList())
        ));
    }

    private Map<String, List<MenteeScheduleResponse.MentorInfoAndSchedule>> groupMenteeSchedulesByDate(List<Schedule> schedules) {
        return schedules.stream().collect(Collectors.groupingBy(
                schedule -> schedule.getDate().toLocalDate().toString(),
                Collectors.mapping(schedule -> {
                    Member mentor = memberRepository.findById(schedule.getMentorId()).orElseThrow(
                            () -> new RuntimeException("식별자가 " + schedule.getMentorId() + "인 멘토를 찾을 수 없습니다.")
                    );
                    MentorInfo mentorInfo = mentorInfoRepository.findByMemberId(mentor.getId()).orElseThrow(
                            () -> new RuntimeException("식별자가 " + mentor.getId() + "인 멘토 정보를 찾을 수 없습니다.")
                    );
                    return new MenteeScheduleResponse.MentorInfoAndSchedule(schedule.getScheduleId(), schedule.getDate().toLocalTime().toString(), mentor.getName(), mentorInfo.getCompanyName(), mentorInfo.getDepartment(), mentor.getProfileImg(), schedule.isConfirmed(), mentorInfo.getYears());
                }, Collectors.toList())
        ));
    }

    private List<MentorScheduleResponse> mapToMentorScheduleResponse(Map<String, List<MentorScheduleResponse.ScheduleInfo>> groupedSchedule) {
        return groupedSchedule.entrySet().stream()
                .map(entry -> new MentorScheduleResponse(entry.getKey(), entry.getValue()))
                .collect(Collectors.toList());
    }

    private List<MenteeScheduleResponse> mapToMenteeScheduleResponse(Map<String, List<MenteeScheduleResponse.MentorInfoAndSchedule>> groupedSchedules) {
        return groupedSchedules.entrySet().stream()
                .map(entry -> new MenteeScheduleResponse(entry.getKey(), entry.getValue()))
                .collect(Collectors.toList());
    }

    private Apply buildApply(Long scheduleId, Long memberId, String fileUrl) {
        return Apply.builder()
                .applyId(new ApplyId(scheduleId, memberId))
                .fileUrl(fileUrl)
                .build();
    }
}
