package com.ssafy.foss.schedule.service;

import com.ssafy.foss.apply.service.ApplyService;
import com.ssafy.foss.member.dto.MentorResponse;
import com.ssafy.foss.member.service.MemberService;
import com.ssafy.foss.schedule.domain.Schedule;
import com.ssafy.foss.schedule.dto.response.MentorInfoAndScheduleResponse;
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
    private final MemberService memberService;
    private final ApplyService applyService;

    public Schedule findById(Long id) {
        return scheduleRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("찾는 일정이 없습니다."));
    }

    public List<Schedule> findAllById(List<Long> scheduleIds) {
        return scheduleRepository.findAllByIdOrderByDateAsc(scheduleIds);
    }

    public List<Schedule> findByMemberId(Long memberId) {
        return scheduleRepository.findByMemberIdOrderByDateAsc(memberId);
    }
    public List<MentorInfoAndScheduleResponse> findAllSchedule(int month) {
        DateUtil.validateMonth(month);
        LocalDateTime startDate = DateUtil.getStartDate(month);
        LocalDateTime endDate = DateUtil.getEndDate(startDate, month);
        List<Schedule> schedules = scheduleRepository.findByDateBetweenOrderByDateAsc(startDate, endDate);

        return mapToMentorInfoAndSchedule(groupSchedulesByDate(schedules));
    }

    public List<Schedule> findByMemberIdAndDateBetween(Long memberId, LocalDateTime startDate, LocalDateTime endDate) {
        return scheduleRepository.findByMemberIdAndDateBetweenOrderByDateAsc(memberId, startDate, endDate);
    }

    public boolean findByMemberIdAndDate(Long memberId, LocalDateTime dateTime) {
        return scheduleRepository.findByMemberIdAndDate(memberId, dateTime).isPresent();
    }

    public Schedule saveSchedule(Schedule schedule) {
        return scheduleRepository.save(schedule);
    }

    public void deleteById(Long scheduleId) {
        scheduleRepository.deleteById(scheduleId);
    }

    private Map<String, List<MentorInfoAndScheduleResponse.MentorInfoAndSchedule>> groupSchedulesByDate(List<Schedule> schedules) {
        return schedules.stream().collect(Collectors.groupingBy(
                schedule -> schedule.getDate().toLocalDate().toString(),
                Collectors.mapping(schedule -> {
                    MentorResponse mentor = memberService.findMentorResponseById(schedule.getMember().getId());
                    Long applyCount = applyService.countByScheduleId(schedule.getId());
                    return new MentorInfoAndScheduleResponse.MentorInfoAndSchedule(schedule.getId(), schedule.getDate().toLocalTime().toString(), applyCount, new MentorInfoAndScheduleResponse.MentorInfo(schedule.getMember().getId(), mentor.getName(), mentor.getCompanyName(), mentor.getDepartment(), mentor.getProfileImg()));
                }, Collectors.toList())
        ));
    }

    private List<MentorInfoAndScheduleResponse> mapToMentorInfoAndSchedule(Map<String, List<MentorInfoAndScheduleResponse.MentorInfoAndSchedule>> groupedSchedule) {
        return groupedSchedule.entrySet().stream()
                .map(entry -> new MentorInfoAndScheduleResponse(entry.getKey(), entry.getValue()))
                .collect(Collectors.toList());
    }
}
