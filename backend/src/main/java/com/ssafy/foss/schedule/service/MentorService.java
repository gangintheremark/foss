package com.ssafy.foss.schedule.service;

import com.ssafy.foss.schedule.domain.Schedule;
import com.ssafy.foss.schedule.dto.MentorScheduleResponse;
import com.ssafy.foss.schedule.exception.InvalidMonthException;
import com.ssafy.foss.schedule.repository.ScheduleRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@Service
public class MentorService {
    private final ScheduleRepository scheduleRepository;

    public List<MentorScheduleResponse> findScheduleByMentorId(Long mentorId, int month) {
        if (month < 1 || month > 12) {
            throw new InvalidMonthException("Invalid month: " + month);
        }

        int currentYear = LocalDate.now().getYear();
        LocalDateTime startDate = LocalDateTime.of(currentYear, month, 1, 0, 0);
        LocalDateTime endDate = startDate.plusMonths(2);

        List<Schedule> schedules = scheduleRepository.findScheduleByMentorId(mentorId, startDate, endDate);

        if(schedules.isEmpty()) return null;

        Map<String, List<String>> groupedSchedule = schedules.stream().collect(Collectors.groupingBy(
                schedule -> schedule.getDate().toLocalDate().toString(),
                Collectors.mapping(schedule -> schedule.getDate().toLocalTime().format(DateTimeFormatter.ofPattern("HH:mm")), Collectors.toList())
        ));

        return groupedSchedule.entrySet().stream()
                .map(entry -> new MentorScheduleResponse(entry.getKey(), entry.getValue()))
                .collect(Collectors.toList());
    }
}
