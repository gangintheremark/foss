package com.ssafy.foss.interview.service;

import com.ssafy.foss.interview.domain.Interview;
import com.ssafy.foss.interview.domain.Status;
import com.ssafy.foss.interview.dto.InterviewDetailResponse;
import com.ssafy.foss.interview.dto.InterviewResponse;
import com.ssafy.foss.interview.dto.MenteeInterviewResponse;
import com.ssafy.foss.interview.dto.MentorInterviewResponse;
import com.ssafy.foss.interview.repository.InterviewRepository;
import com.ssafy.foss.member.domain.Member;
import com.ssafy.foss.member.dto.MentorResponse;
import com.ssafy.foss.member.service.MemberService;
import com.ssafy.foss.respondent.domain.Respondent;
import com.ssafy.foss.respondent.service.RespondentService;
import com.ssafy.foss.schedule.domain.Schedule;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.jetbrains.annotations.NotNull;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.Duration;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.time.format.DateTimeFormatter;
import java.time.temporal.ChronoUnit;
import java.util.List;
import java.util.stream.Collectors;

@Slf4j
@Transactional(readOnly = true)
@RequiredArgsConstructor
@Service
public class InterviewService {
    private final InterviewRepository interviewRepository;
    private final RespondentService respondentService;
    private final MemberService memberService;
    private final DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm");

    @Transactional
    public Interview create(Schedule schedule) {
        Interview interview = Interview.builder()
                .member(schedule.getMember())
                .status(Status.WAIT)
                .startedDate(schedule.getDate()).build();

        return interviewRepository.save(interview);
    }

    public Interview findById(Long id) {
        return interviewRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("면접 일정을 찾을 수 없습니다."));
    }

    public List<MentorInterviewResponse> findAllByMentor(Long memberId) {
        List<Interview> interviews = interviewRepository.findAllByMemberIdAndStatusNotOrderByStartedDate(memberId, Status.END);

        return mapToMentorInterviewResponse(interviews);
    }

    private List<MentorInterviewResponse> mapToMentorInterviewResponse(List<Interview> interviews) {
        LocalDate today = LocalDate.now();
        return interviews.stream()
                .map(interview -> {
                    long restDay = ChronoUnit.DAYS.between(today, interview.getStartedDate());
                    return MentorInterviewResponse.builder()
                            .interviewId(interview.getId())
                            .restDay(restDay)
                            .startedDate(interview.getStartedDate().format(formatter))
                            .mentees(findMenteeByInterviewId(interview.getId()))
                            .build();
                }).collect(Collectors.toList());
    }

    private List<MenteeInterviewResponse> mapToMenteeInterviewResponse(List<Interview> interviews, Long memberId) {
        LocalDate today = LocalDate.now();
        return interviews.stream()
                .map(interview -> {
                    long restDay = ChronoUnit.DAYS.between(today, interview.getStartedDate());
                    Respondent respondent = respondentService.findByInterviewId(interview.getId(), memberId);
                    MentorResponse mentorResponse = memberService.findMentorResponseById(interview.getMember().getId());
                    return MenteeInterviewResponse.builder()
                            .interviewId(interview.getId())
                            .restDay(restDay)
                            .fileUrl(respondent.getFileUrl())
                            .startedDate(interview.getStartedDate().format(formatter))
                            .mentorInfo(buildMentorInfo(mentorResponse))
                            .build();
                }).collect(Collectors.toList());
    }

    private List<MentorInterviewResponse.MenteeInfo> findMenteeByInterviewId(Long interviewId) {
        List<Respondent> respondents = respondentService.findAllByInterviewId(interviewId);

        return respondents.stream()
                .map(respondent -> MentorInterviewResponse.MenteeInfo.builder()
                        .name(respondent.getMember().getName())
                        .fileUrl(respondent.getFileUrl())
                        .build())
                .collect(Collectors.toList());
    }

    public List<MenteeInterviewResponse> findAllByMentee(Long memberId) {
        List<Interview> interviews = interviewRepository.findAllByMenteeIdOrderByStartDateAsc(memberId);
        return mapToMenteeInterviewResponse(interviews, memberId);
    }

    @Transactional
    public void updateStatus(Long interviewId, Status status) {
        Interview interview = findById(interviewId);
        interview.setStatus(status);
    }

    public List<InterviewDetailResponse> findAllByMentorAndDate(Long id, String dateString) {
        LocalDate localDate = LocalDate.parse(dateString, DateTimeFormatter.ISO_LOCAL_DATE);
        LocalDateTime startOfDay = localDate.atStartOfDay();
        LocalDateTime endOfDay = localDate.atTime(LocalTime.MAX);

        List<Interview> interviews = interviewRepository.findAllByMemberIdAndStatusNotAndStartedDateBetweenOrderByStartedDateAsc(id, Status.END, startOfDay, endOfDay);
        return mapToInterviewDetailResponse(interviews);
    }

    private @NotNull List<InterviewDetailResponse> mapToInterviewDetailResponse(List<Interview> interviews) {
        return interviews.stream()
                .map(interview -> {
                    List<Long> memberIds = respondentService.findMemberIdAllByInterviewId(interview.getId());
                    LocalDateTime startedDate = interview.getStartedDate();
                    return InterviewDetailResponse.builder()
                            .interviewId(interview.getId())
                            .startedDate(String.format("%02d:%02d", startedDate.getHour(), startedDate.getMinute()))
                            .respondents(memberIds).build();
                }).collect(Collectors.toList());
    }

    public boolean findByMemberIdAndStartedDate(Long memberId, LocalDateTime dateTime) {
        return interviewRepository.findByMemberIdAndStartedDate(memberId, dateTime).isEmpty();
    }

    public Integer findCountByMentorId(Long memberId) {
        return interviewRepository.findCountByMemberId(memberId);
    }

    private MenteeInterviewResponse.MentorInfo buildMentorInfo(MentorResponse mentorResponse) {
        return MenteeInterviewResponse.MentorInfo.builder()
                .name(mentorResponse.getName())
                .department(mentorResponse.getDepartment())
                .companyName(mentorResponse.getCompanyName())
                .build();
    }

    public List<Interview> findByMemberId(Long memberId) {
        return interviewRepository.findByMemberId(memberId);
    }

    public void deleteById(Long interviewId) {
        interviewRepository.deleteById(interviewId);
    }

    public boolean isAccessStart(Long interviewId) {
        Interview interview = findById(interviewId);
        LocalDateTime startedDate = interview.getStartedDate();
        LocalDateTime now = LocalDateTime.now();

        log.info("startedDate: " + startedDate.toString());
        log.info("now: " + now.toString());

        Duration duration = Duration.between(startedDate, now);
        log.info("사이 시간(분); " + duration.toMinutes());
        return Math.abs(duration.toMinutes()) <= 30;
    }
}
