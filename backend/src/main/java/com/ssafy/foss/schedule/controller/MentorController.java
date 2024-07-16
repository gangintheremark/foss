package com.ssafy.foss.schedule.controller;

/*
 * 멘토 일정 관련 Controller
 * - 모의 면접 일정 생성
 * - 면접 일정 리스트 조회
 * - 면접 일정 상세 조회
 * - 면접 일정 삭제
 * - 면접 신청인원 확정
 *
 * @author 남경민
 */

import com.ssafy.foss.schedule.service.ScheduleService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RequiredArgsConstructor
@RestController
@RequestMapping("/schedule/mentor")
public class MentorController {
    private final ScheduleService scheduleService;
}
