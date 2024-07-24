package com.ssafy.foss.schedule.service;

import com.ssafy.foss.member.domain.Member;
import com.ssafy.foss.member.repository.MemberRepository;
import com.ssafy.foss.mentorInfo.domain.MentorInfo;
import com.ssafy.foss.mentorInfo.repository.MentorInfoRepository;
import com.ssafy.foss.schedule.domain.Schedule;
import com.ssafy.foss.schedule.dto.response.MentorInfoAndScheduleResponse;
import com.ssafy.foss.schedule.repository.ApplyRepository;
import com.ssafy.foss.schedule.repository.ScheduleRepository;
import com.ssafy.foss.util.DateUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

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
    private final ApplyRepository applyRepository;

    public List<MentorInfoAndScheduleResponse> findAllSchedule(int month) {
        DateUtil.validateMonth(month);
        LocalDateTime startDate = DateUtil.getStartDate(month);
        LocalDateTime endDate = DateUtil.getEndDate(startDate, month);

        return mapToMentorInfoAndSchedule(groupSchedulesByDate(scheduleRepository.findScheduleByDateBetweenAndIsConfirmedFalse(startDate, endDate)));

    }

    private Map<String, List<MentorInfoAndScheduleResponse.MentorInfoAndSchedule>> groupSchedulesByDate(List<Schedule> schedules) {
        return schedules.stream().collect(Collectors.groupingBy(
                schedule -> schedule.getDate().toLocalDate().toString(),
                Collectors.mapping(schedule -> {
                    Member member = memberRepository.findById(schedule.getMentorId()).orElseThrow(
                            () -> new RuntimeException("식별자가 " + schedule.getMentorId() + "인 회원 정보를 찾을 수 없습니다.")
                    );
                    MentorInfo mentorInfo = mentorInfoRepository.findByMemberId(member.getId()).orElseThrow(
                            () -> new RuntimeException("식별자가 " + member.getId() + "인 멘토 정보를 찾을 수 없습니다.")
                    );

                    Long applyCount = applyRepository.countByApplyId_ScheduleId(schedule.getScheduleId());

                    return new MentorInfoAndScheduleResponse.MentorInfoAndSchedule(schedule.getMentorId(), schedule.getDate().toLocalTime().toString(), member.getName(), mentorInfo.getCompanyName(), mentorInfo.getDepartment(), member.getProfileImg(), mentorInfo.getSelfProduce(), mentorInfo.getYears(), applyCount);
                }, Collectors.toList())
        ));
    }

    private List<MentorInfoAndScheduleResponse> mapToMentorInfoAndSchedule(Map<String, List<MentorInfoAndScheduleResponse.MentorInfoAndSchedule>> groupedSchedule) {
        return groupedSchedule.entrySet().stream()
                .map(entry -> new MentorInfoAndScheduleResponse(entry.getKey(), entry.getValue()))
                .collect(Collectors.toList());
    }

}
