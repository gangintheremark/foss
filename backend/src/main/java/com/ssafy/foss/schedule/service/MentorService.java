package com.ssafy.foss.schedule.service;

import com.ssafy.foss.interview.domain.Interview;
import com.ssafy.foss.interview.service.InterviewService;
import com.ssafy.foss.member.domain.Member;
import com.ssafy.foss.member.service.MemberService;

import com.ssafy.foss.notification.domain.Notification;
import com.ssafy.foss.notification.domain.Type;
import com.ssafy.foss.notification.service.NotificationService;
import com.ssafy.foss.respondent.service.RespondentService;
import com.ssafy.foss.schedule.domain.Apply;
import com.ssafy.foss.schedule.domain.Schedule;

import com.ssafy.foss.schedule.dto.request.ConfirmScheduleRequest;
import com.ssafy.foss.schedule.dto.response.ApplyResponse;
import com.ssafy.foss.schedule.dto.response.ScheduleAndApplyResponse;
import com.ssafy.foss.schedule.exception.InvalidDateFormatException;
import com.ssafy.foss.schedule.repository.ApplyRepository;

import com.ssafy.foss.schedule.repository.ScheduleRepository;
import com.ssafy.foss.util.DateUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.time.format.DateTimeParseException;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

// TODO : 예외 처리 수정
@RequiredArgsConstructor
@Service
@Transactional(readOnly = true)
public class MentorService {
    private final ApplyRepository applyRepository;
    private final ScheduleRepository scheduleRepository;
    private final MemberService memberService;
    private final NotificationService notificationService;
    private final InterviewService interviewService;
    private final RespondentService respondentService;

    @Transactional
    public Schedule createSchedule(Long memberId, String date) {
        LocalDateTime dateTime = parseDate(date);
        Member member = memberService.findById(memberId);
        checkIfScheduleExists(memberId, dateTime);
        return scheduleRepository.save(buildSchedule(member, dateTime));
    }

    public List<ScheduleAndApplyResponse> findScheduleAndApplyByMentorId(Long memberId, int month) {
        DateUtil.validateMonth(month);
        LocalDateTime startDate = DateUtil.getStartDate(month);
        LocalDateTime endDate = DateUtil.getEndDate(startDate, month);

        return mapToScheduleAndApplyResponse(groupSchedulesByDate(scheduleRepository.findByMemberIdAndDateBetween(memberId, startDate, endDate)));
    }

    @Transactional
    public void confirmSchedule(Long memberId, ConfirmScheduleRequest request) {
        Long scheduleId = request.getScheduleId();
        List<Long> memberIds = request.getMemberIds();

        Schedule schedule = scheduleRepository.findById(scheduleId).orElseThrow(
                () -> new RuntimeException("식별자가 " + scheduleId + "인 일정 정보를 찾을 수 없습니다.")
        );

        List<Apply> applies = applyRepository.findByScheduleId(scheduleId);
        List<Apply> confirmedApplies = filterConfirmedApplies(applies, memberIds);
        List<Notification> notifications = createNotifications(memberId, confirmedApplies);

        notificationService.create(notifications);

        // TODO : 형민아 여따가 넣어놔라. 면접 생성 하는거.
        Interview interview = interviewService.create(schedule);
        respondentService.create(confirmedApplies, interview);

        applyRepository.deleteAll(applies);
        scheduleRepository.deleteById(scheduleId);
    }

    @Transactional
    public void deleteSchedule(Long scheduleId) {
        scheduleRepository.deleteById(scheduleId);
        applyRepository.deleteAll(applyRepository.findByScheduleId(scheduleId));
    }


    // TODO : false -> interviewRepository.findByIdAndDate(mentorId, dateTime)
    private void checkIfScheduleExists(Long mentorId, LocalDateTime dateTime) {
        if (scheduleRepository.findByMemberIdAndDate(mentorId, dateTime).isPresent()) {
            throw new RuntimeException("해당 날짜에 등록한 일정이 존재합니다.");
        } else if(false) {
            throw new RuntimeException("해당 날짜와 시간에 예정된 면접 일정이 존재합니다.");
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
        return applyRepository.findByScheduleId(schedule.getId()).stream()
                        .map(apply -> new ApplyResponse(apply.getMemberId(), memberService.findById(apply.getMemberId()).getName(), apply.getFileUrl()))
                        .collect(Collectors.toList());
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
                .filter(apply -> memberIds.contains(apply.getMemberId()))
                .collect(Collectors.toList());
    }

    private static List<Notification> createNotifications(Long memberId, List<Apply> confirmedApplies) {
        List<Notification> notifications = confirmedApplies.stream()
                .map(confirmedApply ->
                        Notification.builder()
                                .senderId(memberId)
                                .receiverId(confirmedApply.getMemberId())
                                .type(Type.CONFIRM)
                                .content("면접이 확정되었습니다!")
                                .targetUrl(null)
                                .isRead(false).build()
                ).collect(Collectors.toList());
        return notifications;
    }

}
