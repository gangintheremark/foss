package com.ssafy.foss.schedule.service;

import com.ssafy.foss.apply.domain.Apply;
import com.ssafy.foss.apply.service.ApplyService;
import com.ssafy.foss.interview.dto.InterviewResponse;
import com.ssafy.foss.interview.service.InterviewService;
import com.ssafy.foss.member.dto.MentorResponse;
import com.ssafy.foss.member.service.MemberService;
import com.ssafy.foss.notification.domain.Notification;
import com.ssafy.foss.notification.domain.Type;
import com.ssafy.foss.notification.service.NotificationService;
import com.ssafy.foss.member.domain.Member;
import com.ssafy.foss.schedule.domain.Schedule;
import com.ssafy.foss.schedule.dto.response.MenteeScheduleResponse;
import com.ssafy.foss.util.DateUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@Service
@Transactional(readOnly = true)
public class MenteeService {
    private final NotificationService notificationService;
    private final MemberService memberService;
    private final InterviewService interviewService;
    private final ApplyService applyService;
    private final ScheduleService scheduleService;

    public List<MenteeScheduleResponse> findScheduleByMemberId(Long memberId, int month) {
        DateUtil.validateMonth(month);

        List<Apply> applies = applyService.findByMemberId(memberId);
        List<Long> scheduleIds = extractScheduleIds(applies);
        List<Schedule> schedules = scheduleService.findAllById(scheduleIds);

        return mapToMenteeScheduleResponse(groupMenteeSchedulesByDate(schedules));

    }

    @Transactional
    public void createApply(Long memberId, Long scheduleId, MultipartFile file) {
        //checkIfApplyExists(scheduleId, memberId);
        //checkIfScheduleConflict(memberId, scheduleId);
        Schedule schedule = scheduleService.findById(scheduleId);
        Member member = memberService.findById(memberId);

        String fileUrl = "http://example.com/file3.pdf"; // TODO : 나중에 제거

        Member sender = memberService.findById(memberId);
        notificationService.create(createNotifications(sender, schedule));

        applyService.saveApply(buildApply(member, schedule, fileUrl));
    }

    @Transactional
    public void deleteApply(Long scheduleId, Long memberId) {
        applyService.deleteByMemberIdAndScheduleId(memberId, scheduleId);
    }

    private void checkIfApplyExists(Long scheduleId, Long memberId) {
        if (applyService.findByScheduleIdAndMemberId(scheduleId, memberId)) {
            throw new RuntimeException("이미 신청하신 일정입니다.");
        }
    }

    private void checkIfScheduleConflict(Long memberId, Long scheduleId) {
        Schedule schedule = scheduleService.findById(scheduleId);
        LocalDateTime scheduleDate = schedule.getDate();

        List<Apply> existingApplies = applyService.findByMemberId(memberId);
        for (Apply apply : existingApplies) {
            if (apply.getSchedule().getDate().isEqual(scheduleDate)) {
                throw new RuntimeException("동일한 시간에 신청된 면접이 존재합니다.");
            }
        }

        List<InterviewResponse> existingInterviews = interviewService.findAllByMentee(memberId);
        for (InterviewResponse interview : existingInterviews) {
            if (interview.getStartedDate().equals(scheduleDate)) {
                throw new RuntimeException("동일한 시간에 확정된 면접이 존재합니다.");
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
                    MentorResponse mentor = memberService.findMentorResponseById(schedule.getMember().getId());
                    return new MenteeScheduleResponse.MentorInfoAndSchedule(schedule.getId(), schedule.getDate().toLocalTime().toString(), mentor.getName(), mentor.getCompanyName(), mentor.getDepartment(), mentor.getProfileImg());
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

    private Apply buildApply(Member member, Schedule schedule, String fileUrl) {
        return Apply.builder()
                .member(member)
                .schedule(schedule)
                .fileUrl(fileUrl)
                .build();
    }

}
