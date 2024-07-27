package com.ssafy.foss.schedule.service;

import com.ssafy.foss.member.domain.Member;
import com.ssafy.foss.member.dto.MentorResponse;
import com.ssafy.foss.member.repository.MemberRepository;
import com.ssafy.foss.member.service.MemberService;
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
    private final MemberService memberService;

    public Schedule findById(Long id) {
        return scheduleRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("찾는 스케줄이 없어요"));
    }

    public List<MentorInfoAndScheduleResponse> findAllSchedule(int month) {
        DateUtil.validateMonth(month);
        LocalDateTime startDate = DateUtil.getStartDate(month);
        LocalDateTime endDate = DateUtil.getEndDate(startDate, month);

        return mapToMentorInfoAndSchedule(groupSchedulesByDate(scheduleRepository.findScheduleByDateBetween(startDate, endDate)));

    }

    // TODO : 나중에 형민이가 만든 멘토정보 가져오는 메서드로 정보 가져오기
    private Map<String, List<MentorInfoAndScheduleResponse.MentorInfoAndSchedule>> groupSchedulesByDate(List<Schedule> schedules) {
        return schedules.stream().collect(Collectors.groupingBy(
                schedule -> schedule.getDate().toLocalDate().toString(),
                Collectors.mapping(schedule -> {
                    MentorResponse mentorResponse = memberService.findMentorResponseById(schedule.getMember().getId());
                    Long applyCount = applyRepository.countByScheduleId(schedule.getId());

                    return new MentorInfoAndScheduleResponse.MentorInfoAndSchedule(schedule.getMember().getId(), schedule.getDate().toLocalTime().toString(), mentorResponse.getName(), mentorResponse.getCompanyName(), mentorResponse.getDepartment(), mentorResponse.getProfileImg(), 0, applyCount);
                }, Collectors.toList())
        ));
    }

    private List<MentorInfoAndScheduleResponse> mapToMentorInfoAndSchedule(Map<String, List<MentorInfoAndScheduleResponse.MentorInfoAndSchedule>> groupedSchedule) {
        return groupedSchedule.entrySet().stream()
                .map(entry -> new MentorInfoAndScheduleResponse(entry.getKey(), entry.getValue()))
                .collect(Collectors.toList());
    }

}
