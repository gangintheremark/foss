package com.ssafy.foss.schedule.service;

import com.ssafy.foss.interview.domain.Interview;
import com.ssafy.foss.interview.dto.InterviewResponse;
import com.ssafy.foss.interview.service.InterviewService;
import com.ssafy.foss.member.dto.MentorResponse;
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

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@Service
@Transactional(readOnly = true)
public class MenteeService {
    private final ApplyRepository applyRepository;
    private final ScheduleRepository scheduleRepository;
    private final NotificationService notificationService;
    private final MemberService memberService;
    private final InterviewService interviewService;

    public List<MenteeScheduleResponse> findScheduleByMemberId(Long memberId, int month) {
        DateUtil.validateMonth(month);

        List<Apply> applies = applyRepository.findByMemberId(memberId);

        List<Long> scheduleIds = extractScheduleIds(applies);

        List<Schedule> schedules = scheduleRepository.findAllById(scheduleIds);

        return mapToMenteeScheduleResponse(groupMenteeSchedulesByDate(schedules));

    }

    @Transactional
    public void createApply(Long memberId, Long scheduleId, MultipartFile file) {
        checkIfApplyExists(scheduleId, memberId);
        checkIfScheduleConflict(memberId, scheduleId);
        Schedule schedule = scheduleRepository.findById(scheduleId)
                .orElseThrow(() -> new RuntimeException("식별자가 " + scheduleId + "인 일정을 찾을 수 없습니다."));
        Member member = memberService.findById(memberId);

        String fileUrl = "http://example.com/file3.pdf"; // TODO : 나중에 제거

        Member sender = memberService.findById(memberId);
        notificationService.create(createNotifications(sender, schedule));

        applyRepository.save(buildApply(member, schedule, fileUrl));
    }

    @Transactional
    public void deleteApply(Long scheduleId, Long memberId) {
        applyRepository.deleteByMemberIdAndScheduleId(memberId, scheduleId);
    }

    private void checkIfApplyExists(Long scheduleId, Long memberId) {
        if (applyRepository.findByScheduleIdAndMemberId(scheduleId, memberId).isPresent()) {
            throw new RuntimeException("이미 신청하신 일정입니다.");
        }
    }

    private void checkIfScheduleConflict(Long memberId, Long scheduleId) {
        Schedule schedule = scheduleRepository.findById(scheduleId)
                .orElseThrow(() -> new RuntimeException("식별자가 " + scheduleId + "인 일정을 찾을 수 없습니다."));
        LocalDateTime scheduleDate = schedule.getDate();

        List<Apply> existingApplies = applyRepository.findByMemberId(memberId);
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
