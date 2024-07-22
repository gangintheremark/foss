package com.ssafy.foss.schedule.service;

import com.ssafy.foss.member.domain.Member;
import com.ssafy.foss.member.repository.MemberRepository;
import com.ssafy.foss.mentorInfo.domain.MentorInfo;
import com.ssafy.foss.mentorInfo.repository.MentorInfoRepository;
import com.ssafy.foss.schedule.domain.Schedule;
import com.ssafy.foss.schedule.dto.MentorInfoAndScheduleResponse;
import com.ssafy.foss.schedule.exception.InvalidMonthException;
import com.ssafy.foss.schedule.repository.ScheduleRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@Service
@Transactional(readOnly = true)
public class ScheduleService {
    private final ScheduleRepository scheduleRepository;
    private final MentorInfoRepository mentorInfoRepository;
    private final MemberRepository memberRepository;

    public List<MentorInfoAndScheduleResponse> findAllSchedule(int month) {
        validateMonth(month);
        LocalDateTime startDate = getStartDate(month);
        LocalDateTime endDate = getEndDate(startDate, month);

        return mapToMentorInfoAndSchedule(groupSchedulesByDate(scheduleRepository.findScheduleByDateBetweenAndIsConfirmedFalse(startDate, endDate)));

    }

    public void validateMonth(int month) {
        if (month < 1 || month > 12) {
            throw new InvalidMonthException("Invalid month: " + month);
        }
    }

    private LocalDateTime getStartDate(int month) {
        int currentYear = LocalDate.now().getYear();
        return LocalDateTime.of(currentYear, month, 1, 0, 0);
    }

    private LocalDateTime getEndDate(LocalDateTime startDate, int month) {
        if (month == 12) {
            return LocalDateTime.of(startDate.getYear() + 1, 2, 1, 0, 0);
        } else {
            return startDate.plusMonths(2);
        }
    }

    private Map<String, List<MentorInfoAndScheduleResponse.MentorInfoAndSchedule>> groupSchedulesByDate(List<Schedule> schedules) {
        return schedules.stream().collect(Collectors.groupingBy(
                schedule -> schedule.getDate().toLocalDate().toString(),
                Collectors.mapping(schedule -> {
                    MentorInfo mentorInfo = mentorInfoRepository.findById(schedule.getMentorId()).orElseThrow(
                            () -> new RuntimeException("식별자가 " + schedule.getMentorId() + "인 멘토 정보를 찾을 수 없습니다.")
                    );
                    Member member = memberRepository.findById(mentorInfo.getMemberId()).orElseThrow(
                            () -> new RuntimeException("식별자가 " + mentorInfo.getMemberId() + "인 회원 정보를 찾을 수 없습니다.")
                    );

                    return new MentorInfoAndScheduleResponse.MentorInfoAndSchedule(schedule.getDate().toLocalTime().toString(), member.getName(), mentorInfo.getCompanyName());
                }, Collectors.toList())
        ));
    }

    private List<MentorInfoAndScheduleResponse> mapToMentorInfoAndSchedule(Map<String, List<MentorInfoAndScheduleResponse.MentorInfoAndSchedule>> groupedSchedule) {
        return groupedSchedule.entrySet().stream()
                .map(entry -> new MentorInfoAndScheduleResponse(entry.getKey(), entry.getValue()))
                .collect(Collectors.toList());
    }

}
