package com.ssafy.foss.schedule.service;

import com.ssafy.foss.member.service.MemberService;
import com.ssafy.foss.mentorInfo.domain.MentorInfo;
import com.ssafy.foss.mentorInfo.repository.MentorInfoRepository;
import com.ssafy.foss.notification.domain.Notification;
import com.ssafy.foss.notification.domain.Type;
import com.ssafy.foss.notification.service.NotificationService;
import com.ssafy.foss.member.domain.Member;
import com.ssafy.foss.member.repository.MemberRepository;
import com.ssafy.foss.schedule.domain.Apply;
import com.ssafy.foss.schedule.domain.Schedule;
import com.ssafy.foss.schedule.dto.response.MenteeScheduleResponse;
import com.ssafy.foss.schedule.repository.ApplyRepository;
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
    private final ScheduleRepository scheduleRepository;
    private final MemberRepository memberRepository;
    private final MentorInfoRepository mentorInfoRepository;
    private final NotificationService notificationService;
    private final MemberService memberService;

    public List<MenteeScheduleResponse> findScheduleByMemberId(Long memberId, int month) {
        DateUtil.validateMonth(month);

        List<Apply> applies = applyRepository.findByMemberId(memberId);

        List<Long> scheduleIds = extractScheduleIds(applies);

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

        Member sender = memberService.findById(memberId);
        notificationService.create(createNotifications(sender, schedule));
        return null;
//        return applyRepository.save(buildApply(scheduleId, memberId, fileUrl)); TODO: 수정
    }

    @Transactional
    public void deleteApply(Long scheduleId, Long memberId) {
        applyRepository.deleteAllByScheduleId(scheduleId);
    }

    private void checkIfApplyExists(Long scheduleId, Long memberId) {
        if (applyRepository.findByScheduleIdAndMemberId(scheduleId, memberId).isPresent()) {
            throw new RuntimeException("이미 신청하신 일정입니다.");
        }
    }

    private void checkIfScheduleConflict(Long memberId, Schedule newSchedule) {
        List<Apply> applies = applyRepository.findByMemberId(memberId);
        for (Apply apply : applies) {
            Schedule appliedSchedule = scheduleRepository.findById(apply.getSchedule().getId())
                    .orElseThrow(() -> new RuntimeException("식별자가 " + apply.getSchedule().getId() + "인 일정을 찾을 수 없습니다."));
            if (newSchedule.getDate().equals(appliedSchedule.getDate())) {
                throw new RuntimeException("동일한 시간에 신청한 일정이 있습니다.");
            }
        }
    }

    private List<Long> extractScheduleIds(List<Apply> applies) {
        List<Long> scheduleIds = applies.stream()
                .map(apply -> apply.getSchedule().getId())
                .collect(Collectors.toList());
        return scheduleIds;
    }

    private Map<String, List<MenteeScheduleResponse.MentorInfoAndSchedule>> groupMenteeSchedulesByDate(List<Schedule> schedules) {
        return schedules.stream().collect(Collectors.groupingBy(
                schedule -> schedule.getDate().toLocalDate().toString(),
                Collectors.mapping(schedule -> {
                    Member mentor = memberRepository.findById(schedule.getMember().getId()).orElseThrow(
                            () -> new RuntimeException("식별자가 " + schedule.getMember().getId() + "인 멘토를 찾을 수 없습니다.")
                    );
                    MentorInfo mentorInfo = mentorInfoRepository.findByMemberId(mentor.getId()).orElseThrow(
                            () -> new RuntimeException("식별자가 " + mentor.getId() + "인 멘토 정보를 찾을 수 없습니다.")
                    );
                    return new MenteeScheduleResponse.MentorInfoAndSchedule(schedule.getId(), schedule.getDate().toLocalTime().toString(), mentor.getName(), mentorInfo.getCompanyName(), mentorInfo.getDepartment(), mentor.getProfileImg());
                }, Collectors.toList())
        ));
    }

    private List<MenteeScheduleResponse> mapToMenteeScheduleResponse(Map<String, List<MenteeScheduleResponse.MentorInfoAndSchedule>> groupedSchedules) {
        return groupedSchedules.entrySet().stream()
                .map(entry -> new MenteeScheduleResponse(entry.getKey(), entry.getValue()))
                .collect(Collectors.toList());
    }

    private static Notification createNotifications(Member sender, Schedule schedule) {
        Notification notification = Notification.builder()
                .senderId(sender.getId())
                .receiverId(schedule.getMember().getId())
                .type(Type.APPLY)
                .content(sender.getName() + "님이 면접을 신청하셨습니다!")
                .targetUrl(null)
                .isRead(false).build();
        return notification;
    }
}
