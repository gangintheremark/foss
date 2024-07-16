package com.ssafy.foss.schedule.service;

import com.ssafy.foss.schedule.repository.ScheduleRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@RequiredArgsConstructor
@Service
public class MentorService {
    private final ScheduleRepository scheduleRepository;
}
