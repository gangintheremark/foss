package com.ssafy.foss.schedule.controller;

/*
 * 멘티 일정 관련 Controller
 * - 모의 면접 신청
 * - 면접 신청 취소
 *
 * @author 남경민
 */

import com.ssafy.foss.schedule.service.ScheduleService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RequiredArgsConstructor
@RestController
@RequestMapping("/schedule/mentee")
public class MenteeController {
    private final ScheduleService scheduleService;
}
