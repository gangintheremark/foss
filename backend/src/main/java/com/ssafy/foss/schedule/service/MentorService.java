package com.ssafy.foss.schedule.service;

import com.ssafy.foss.schedule.domain.Apply;
import com.ssafy.foss.schedule.domain.Schedule;
import com.ssafy.foss.schedule.dto.CreateScheduleRequest;
import com.ssafy.foss.schedule.dto.MentorScheduleResponse;
import com.ssafy.foss.schedule.exception.InvalidDateFormatException;
import com.ssafy.foss.schedule.exception.InvalidMonthException;
import com.ssafy.foss.schedule.repository.ApplyRepository;
import com.ssafy.foss.schedule.repository.ScheduleRepository;
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

@RequiredArgsConstructor
@Service
@Transactional(readOnly = true)
public class MentorService {
    private final ScheduleRepository scheduleRepository;
    private final ApplyRepository applyRepository;

    public List<MentorScheduleResponse> findScheduleByMentorId(Long mentorId, int month) {
        if (month < 1 || month > 12) {
            throw new InvalidMonthException("Invalid month: " + month);
        }

        int currentYear = LocalDate.now().getYear();
        LocalDateTime startDate = LocalDateTime.of(currentYear, month, 1, 0, 0);
        LocalDateTime endDate;

        if (month == 12) {
            endDate = LocalDateTime.of(currentYear + 1, 2, 1, 0, 0);
        } else {
            endDate = startDate.plusMonths(2);
        }

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

    public Schedule createSchedule(CreateScheduleRequest request) {
        try {
            DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm");
            LocalDateTime dateTime = LocalDateTime.parse(request.getDate(), formatter);
            Schedule schedule = Schedule.builder()
                    .mentorId(request.getMentorId())
                    .date(dateTime)
                    .build();
            schedule = scheduleRepository.save(schedule);
            return schedule;
        } catch (DateTimeParseException e) {
            throw new InvalidDateFormatException("Invalid Date format");
        }
    }
}
