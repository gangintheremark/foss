package com.ssafy.foss.schedule.service;

import com.ssafy.foss.member.repository.MemberRepository;
import com.ssafy.foss.mentorInfo.repository.MentorInfoRepository;
import com.ssafy.foss.notification.domain.Notification;
import com.ssafy.foss.notification.domain.Type;
import com.ssafy.foss.notification.service.NotificationService;
import com.ssafy.foss.schedule.domain.Apply;
import com.ssafy.foss.schedule.domain.ConfirmedApply;
import com.ssafy.foss.schedule.domain.Schedule;
import com.ssafy.foss.schedule.dto.*;
import com.ssafy.foss.schedule.exception.InvalidDateFormatException;
import com.ssafy.foss.schedule.repository.ApplyRepository;
import com.ssafy.foss.schedule.repository.ConfirmedApplyRepository;
import com.ssafy.foss.schedule.repository.ScheduleRepository;
import com.ssafy.foss.util.DateUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

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
    private final ScheduleRepository scheduleRepository;
    private final ApplyRepository applyRepository;
    private final ConfirmedApplyRepository confirmedApplyRepository;
    private final NotificationService notificationService;
    private final MentorInfoRepository mentorInfoRepository;
    private final MemberRepository memberRepository;

    public List<ScheduleResponse> findScheduleAndApplyByMentorId(Long memberId, int month) {
        DateUtil.validateMonth(month);
        LocalDateTime startDate = DateUtil.getStartDate(month);
        LocalDateTime endDate = DateUtil.getEndDate(startDate, month);
        Long mentorId = mentorInfoRepository.findByMemberId(memberId).orElseThrow(
                () -> new RuntimeException("식별자가 " + memberId + "인 멘토 정보를 찾을 수 없습니다.")
        ).getId();
        return mapToScheduleAndApplyResponse(groupSchedulesByDate(scheduleRepository.findScheduleByMentorIdAndDateBetween(mentorId, startDate, endDate)));
    }

    @Transactional
    public Schedule createSchedule(Long memberId, String date) {
        Long mentorId = mentorInfoRepository.findByMemberId(memberId).orElseThrow(
                () -> new RuntimeException("식별자가 " + memberId + "인 멘토 정보를 찾을 수 없습니다.")
        ).getId();
        LocalDateTime dateTime = parseDate(date);

        checkIfScheduleExists(mentorId, dateTime);

        return scheduleRepository.save(buildSchedule(mentorId, dateTime));
    }

    @Transactional
    public void confirmSchedule(Long memberId, ConfirmScheduleRequest request) {
        Long scheduleId = request.getScheduleId();
        List<Long> memberIds = request.getMemberIds();

        Schedule schedule = scheduleRepository.findById(scheduleId).orElseThrow(
                () -> new RuntimeException("식별자가 " + scheduleId + "인 일정 정보를 찾을 수 없습니다.")
        );

        if (schedule.isConfirmed()) {
            throw new RuntimeException("이미 확정된 일정입니다.");
        }

        schedule.updateConfirmStatus(true);

        List<Apply> applies = applyRepository.findByApplyId_ScheduleId(scheduleId);
        List<Apply> confirmedApplies = filterConfirmedApplies(applies, memberIds);

        List<Notification> notifications = createNotifications(memberId, confirmedApplies);

        notificationService.create(notifications);
        confirmedApplyRepository.saveAll(mapToConfirmApply(confirmedApplies));
        applyRepository.deleteAll(applies);
    }

    @Transactional
    public void deleteSchedule(Long scheduleId) {
        scheduleRepository.deleteById(scheduleId);
        applyRepository.deleteAll(applyRepository.findByApplyId_ScheduleId(scheduleId));
    }

    private void checkIfScheduleExists(Long mentorId, LocalDateTime dateTime) {
        if (scheduleRepository.findScheduleByMentorIdAndDate(mentorId, dateTime).isPresent()) {
            throw new RuntimeException("해당 날짜에 이미 일정이 존재합니다.");
        }
    }

    private Map<String, List<ScheduleAndApplyResponse>> groupSchedulesByDate(List<Schedule> schedules) {
        return schedules.stream().collect(Collectors.groupingBy(
                schedule -> schedule.getDate().toLocalDate().toString(),
                Collectors.mapping(schedule -> {
                    List<ApplyResponse> applies = getApplyResponses(schedule);
                    return new ScheduleAndApplyResponse(schedule.getDate().toLocalTime().toString(), schedule.getScheduleId(), schedule.isConfirmed(), applies);
                }, Collectors.toList())
        ));
    }

    // TODO : "김형민" -> memberRepository.findById(apply.getApplyId().getMemberId()).orElseThrow().getName()
    private List<ApplyResponse> getApplyResponses(Schedule schedule) {
        return schedule.isConfirmed() ?
                confirmedApplyRepository.findByApplyId_ScheduleId(schedule.getScheduleId()).stream()
                        .map(apply -> new ApplyResponse(apply, "김형민"))
                        .collect(Collectors.toList()) :
                applyRepository.findByApplyId_ScheduleId(schedule.getScheduleId()).stream()
                        .map(apply -> new ApplyResponse(apply, "김형민"))
                        .collect(Collectors.toList());
    }

    private List<ScheduleResponse> mapToScheduleAndApplyResponse(Map<String, List<ScheduleAndApplyResponse>> groupedSchedule) {
        return groupedSchedule.entrySet().stream()
                .map(entry -> new ScheduleResponse(entry.getKey(), entry.getValue()))
                .collect(Collectors.toList());
    }

    private List<ConfirmedApply> mapToConfirmApply(List<Apply> comfirmedApplies) {
        return comfirmedApplies.stream()
                .map(apply -> new ConfirmedApply(apply.getApplyId(), apply.getFileUrl()))
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

    private Schedule buildSchedule(Long mentorId, LocalDateTime dateTime) {
        return Schedule.builder()
                .mentorId(mentorId)
                .date(dateTime)
                .build();
    }

    private List<Apply> filterConfirmedApplies(List<Apply> applies, List<Long> memberIds) {
        return applies.stream()
                .filter(apply -> memberIds.contains(apply.getApplyId().getMemberId()))
                .collect(Collectors.toList());
    }

    private static List<Notification> createNotifications(Long memberId, List<Apply> confirmedApplies) {
        List<Notification> notifications = confirmedApplies.stream()
                .map(confirmedApply ->
                        Notification.builder()
                                .senderId(memberId)
                                .receiverId(confirmedApply.getApplyId().getMemberId())
                                .type(Type.CONFIRM)
                                .content("면접이 확정되었습니다!")
                                .targetUrl(null)
                                .isRead(false).build()
                ).collect(Collectors.toList());
        return notifications;
    }

}
