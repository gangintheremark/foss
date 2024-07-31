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
import com.ssafy.foss.s3.service.AwsS3Service;
import com.ssafy.foss.schedule.domain.Schedule;
import com.ssafy.foss.schedule.dto.response.MenteeScheduleResponse;
import com.ssafy.foss.schedule.dto.response.MentorInfoDetailAndScheduleResponse;
import com.ssafy.foss.util.DateUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
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
    private final AwsS3Service awsS3Service;
    private final DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm");

    public List<MenteeScheduleResponse> findScheduleByMemberId(Long memberId) {
        List<Apply> applies = applyService.findByMemberId(memberId);
        List<Long> scheduleIds = extractScheduleIds(applies);
        List<Schedule> schedules = scheduleService.findAllById(scheduleIds);
        return mapToMenteeScheduleResponse(groupMenteeSchedulesByDate(schedules, memberId));
    }

    public MentorInfoDetailAndScheduleResponse findMentorInfoAndScheduleByMentorId(Long mentorId) {
        MentorResponse mentor = memberService.findMentorResponseById(mentorId);
        List<Schedule> schedules = scheduleService.findByMemberId(mentorId);
        return buildMentorInfoDetailAndScheduleResponse(new MentorInfoDetailAndScheduleResponse.MentorInfo(mentor.getName(), mentor.getCompanyName(), mentor.getDepartment(), mentor.getProfileImg(), mentor.getSelfProduce(), mentor.getFileUrl()), mapToMentorInfoAndSchedule(groupSchedulesByDate(schedules)));
    }

    private List<Long> extractScheduleIds(List<Apply> applies) {
        return applies.stream()
                .map(apply -> apply.getSchedule().getId())
                .collect(Collectors.toList());
    }

    private Map<String, List<MenteeScheduleResponse>> groupMenteeSchedulesByDate(List<Schedule> schedules, Long memberId) {
        return schedules.stream().collect(Collectors.groupingBy(
                schedule -> schedule.getDate().toLocalDate().toString(),
                Collectors.mapping(schedule -> {
                    MentorResponse mentor = memberService.findMentorResponseById(schedule.getMember().getId());
                    Apply apply = applyService.findByScheduleIdAndMemberId(schedule.getId(), memberId);
                    return new MenteeScheduleResponse(
                            String.valueOf(schedule.getId()),
                            schedule.getDate().format(formatter),
                            apply.getFileUrl(),
                            new MenteeScheduleResponse.MentorInfo(
                                    mentor.getName(),
                                    mentor.getCompanyName(),
                                    mentor.getDepartment(),
                                    mentor.getProfileImg(),
                                    apply.getFileUrl()
                            )
                    );
                }, Collectors.toList())
        ));
    }
    private Map<String, List<MentorInfoDetailAndScheduleResponse.ScheduleInfo>> groupSchedulesByDate(List<Schedule> schedules) {
        return schedules.stream().collect(Collectors.groupingBy(
                schedule -> schedule.getDate().toLocalDate().toString(),
                Collectors.mapping(schedule -> {
                    return new MentorInfoDetailAndScheduleResponse.ScheduleInfo(schedule.getId(), schedule.getDate().toLocalTime().toString());
                }, Collectors.toList())
        ));
    }

    private List<MentorInfoDetailAndScheduleResponse.ScheduleInfos> mapToMentorInfoAndSchedule(Map<String, List<MentorInfoDetailAndScheduleResponse.ScheduleInfo>> groupedSchedule) {
        return groupedSchedule.entrySet().stream()
                .map(entry -> new MentorInfoDetailAndScheduleResponse.ScheduleInfos(entry.getKey(), entry.getValue()))
                .collect(Collectors.toList());
    }


    private List<MenteeScheduleResponse> mapToMenteeScheduleResponse(Map<String, List<MenteeScheduleResponse>> groupedSchedules) {
        return groupedSchedules.entrySet().stream()
                .flatMap(entry -> entry.getValue().stream())
                .collect(Collectors.toList());
    }

    @Transactional
    public void createApply(Long memberId, Long scheduleId, MultipartFile file) {
        //checkIfApplyExists(scheduleId, memberId);
        //checkIfScheduleConflict(memberId, scheduleId);
        Schedule schedule = scheduleService.findById(scheduleId);
        Member member = memberService.findById(memberId);

        String fileUrl = awsS3Service.uploadProfile(file);

        Member sender = memberService.findById(memberId);
        notificationService.create(createNotifications(sender, schedule));
        applyService.saveApply(buildApply(member, schedule, fileUrl));
    }

    @Transactional
    public void deleteApply(Long scheduleId, Long memberId) {
        String fileUrl = applyService.findByScheduleIdAndMemberId(scheduleId, memberId).getFileUrl();
        awsS3Service.deleteFile(fileUrl);
        applyService.deleteByMemberIdAndScheduleId(memberId, scheduleId);
    }

    private void checkIfApplyExists(Long scheduleId, Long memberId) {
        if (applyService.IsExistByScheduleIdAndMemberId(scheduleId, memberId)) {
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

    private static Notification createNotifications(Member sender, Schedule schedule) {
        return Notification.builder()
                .sender(sender)
                .receiver(schedule.getMember())
                .type(Type.APPLY)
                .content(sender.getName() + "님이 면접을 신청하셨습니다.")
                .targetUrl(null)
                .isRead(false).build();
    }

    private MentorInfoDetailAndScheduleResponse buildMentorInfoDetailAndScheduleResponse(MentorInfoDetailAndScheduleResponse.MentorInfo mentorInfo, List<MentorInfoDetailAndScheduleResponse.ScheduleInfos> scheduleInfos) {
        return MentorInfoDetailAndScheduleResponse.builder()
                .mentorInfo(mentorInfo)
                .scheduleInfos(scheduleInfos)
                .build();
    }

    private Apply buildApply(Member member, Schedule schedule, String fileUrl) {
        return Apply.builder()
                .member(member)
                .schedule(schedule)
                .fileUrl(fileUrl)
                .build();
    }
}
