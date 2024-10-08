package com.ssafy.foss.schedule.service;

import com.ssafy.foss.apply.domain.Apply;
import com.ssafy.foss.apply.service.ApplyService;
import com.ssafy.foss.interview.domain.Interview;
import com.ssafy.foss.interview.service.InterviewService;
import com.ssafy.foss.member.domain.Member;
import com.ssafy.foss.member.dto.MemberResponse;
import com.ssafy.foss.member.dto.MentorResponse;
import com.ssafy.foss.member.service.MemberService;

import com.ssafy.foss.notification.domain.Notification;
import com.ssafy.foss.notification.domain.Type;
import com.ssafy.foss.notification.service.NotificationService;
import com.ssafy.foss.respondent.service.RespondentService;
import com.ssafy.foss.schedule.domain.Schedule;

import com.ssafy.foss.schedule.dto.request.ConfirmScheduleRequest;
import com.ssafy.foss.schedule.dto.request.CreateScheduleRequest;
import com.ssafy.foss.schedule.dto.response.ApplyResponse;
import com.ssafy.foss.schedule.dto.response.ScheduleAndApplyResponse;
import com.ssafy.foss.schedule.exception.InvalidDateFormatException;

import com.ssafy.foss.schedule.repository.ScheduleRepository;
import com.ssafy.foss.util.DateUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import java.time.Duration;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.time.format.DateTimeParseException;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@Service
@Transactional(readOnly = true)
public class MentorService {
    private final MemberService memberService;
    private final NotificationService notificationService;
    private final InterviewService interviewService;
    private final RespondentService respondentService;
    private final ApplyService applyService;
    private final ScheduleService scheduleService;

    @Transactional
    public Schedule createSchedule(Long memberId, CreateScheduleRequest request) {
        LocalDateTime dateTime = parseDate(request.getDate());
        Member member = memberService.findById(memberId);
        checkIfScheduleExists(memberId, dateTime);
        return scheduleService.saveSchedule(buildSchedule(member, dateTime));
    }

    public List<ScheduleAndApplyResponse> findScheduleAndApplyByMentorId(Long memberId, int month) {
        DateUtil.validateMonth(month);
        LocalDateTime startDate = DateUtil.getStartDate(month);
        LocalDateTime endDate = DateUtil.getEndDate(startDate, month);

        return mapToScheduleAndApplyResponse(groupSchedulesByDate(scheduleService.findByMemberIdAndDateBetween(memberId, startDate, endDate)));
    }

    @Transactional
    public void confirmSchedule(Long memberId, ConfirmScheduleRequest request) {
        Long scheduleId = request.getScheduleId();
        List<Long> memberIds = request.getMemberIds();

        Schedule schedule = scheduleService.findById(scheduleId);

        List<Apply> applies = applyService.findByScheduleId(scheduleId);
        List<Apply> confirmedApplies = filterConfirmedApplies(applies, memberIds);
        List<Notification> notifications = createNotifications(memberId, confirmedApplies);

        notificationService.create(notifications);

        Interview interview = interviewService.create(schedule);
        respondentService.create(confirmedApplies, interview);

        applyService.deleteAll(applies);
        scheduleService.deleteById(scheduleId);
    }

    @Transactional
    public void deleteSchedule(Long scheduleId) {
        scheduleService.deleteById(scheduleId);
        applyService.deleteAll(applyService.findByScheduleId(scheduleId));
    }

    private void checkIfScheduleExists(Long mentorId, LocalDateTime dateTime) {
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm");

        List<Schedule> schedules = scheduleService.findByMemberId(mentorId);
        for (Schedule schedule : schedules) {
            LocalDateTime scheduleDate = schedule.getDate();

            if (scheduleDate.toLocalDate().equals(dateTime.toLocalDate())) {
                long hoursBetween = Duration.between(scheduleDate, dateTime).toHours();
                if (Math.abs(hoursBetween) <= 2) {
                    throw new ResponseStatusException(HttpStatus.CONFLICT, "동일한 시간 또는 3시간 이내에 등록된 일정이 존재합니다.");
                }
            }
        }

        List<Interview> interviews = interviewService.findByMemberId(mentorId);
        for (Interview interview : interviews) {
            LocalDateTime interviewDate = interview.getStartedDate();

            if (interviewDate.toLocalDate().equals(dateTime.toLocalDate())) {
                long hoursBetween = Duration.between(interviewDate, dateTime).toHours();
                if (Math.abs(hoursBetween) <= 2) {
                    throw new ResponseStatusException(HttpStatus.CONFLICT, "동일한 시간 또는 3시간 이내에 예정된 면접 일정이 존재합니다.");
                }
            }
        }
    }


    private Map<String, List<ScheduleAndApplyResponse.ScheduleAndApply>> groupSchedulesByDate(List<Schedule> schedules) {
        return schedules.stream().collect(Collectors.groupingBy(
                schedule -> schedule.getDate().toLocalDate().toString(),
                Collectors.mapping(schedule -> {
                    List<ApplyResponse> applies = getApplyResponses(schedule);
                    return new ScheduleAndApplyResponse.ScheduleAndApply(schedule.getId(), schedule.getDate().toLocalTime().toString(), applies);
                }, Collectors.toList())
        ));
    }

    private List<ApplyResponse> getApplyResponses(Schedule schedule) {
        return applyService.findByScheduleId(schedule.getId()).stream()
                        .map(apply -> {
                            MemberResponse memberResponse = memberService.findMember(apply.getMember().getId());
                            return new ApplyResponse(apply.getMember().getId(), memberService.findById(apply.getMember().getId()).getName(), apply.getFileUrl(), memberResponse.getTemperature());
                        }).collect(Collectors.toList());
    }

    private List<ScheduleAndApplyResponse> mapToScheduleAndApplyResponse(Map<String, List<ScheduleAndApplyResponse.ScheduleAndApply>> groupedSchedule) {
        return groupedSchedule.entrySet().stream()
                .map(entry -> new ScheduleAndApplyResponse(entry.getKey(), entry.getValue()))
                .collect(Collectors.toList());
    }

    private LocalDateTime parseDate(String date) {
        try {
            DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm");
            return LocalDateTime.parse(date, formatter);
        } catch (DateTimeParseException e) {
            throw new InvalidDateFormatException("Invalid Date format: " + date);
        }
    }

    private Schedule buildSchedule(Member member, LocalDateTime dateTime) {
        return Schedule.builder()
                .member(member)
                .date(dateTime)
                .build();
    }

    private List<Apply> filterConfirmedApplies(List<Apply> applies, List<Long> memberIds) {
        return applies.stream()
                .filter(apply -> memberIds.contains(apply.getMember().getId()))
                .collect(Collectors.toList());
    }

    private List<Notification> createNotifications(Long memberId, List<Apply> confirmedApplies) {
        Member sender = memberService.findById(memberId);
        MentorResponse mentorResponse = memberService.findMentorResponseById(sender.getId());

        List<Notification> notifications = confirmedApplies.stream()
                .map(confirmedApply ->
                        Notification.builder()
                                .sender(sender)
                                .receiver(confirmedApply.getMember())
                                .type(Type.CONFIRM)
                                .content("[" + mentorResponse.getCompanyName() + "] " + mentorResponse.getName() + " 멘토와의 면접이 확정되었습니다.")
                                .targetUrl(null)
                                .isRead(false).build()
                ).collect(Collectors.toList());
        return notifications;
    }

}
