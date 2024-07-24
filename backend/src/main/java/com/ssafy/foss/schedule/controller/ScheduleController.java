package com.ssafy.foss.schedule.controller;

/*
 * 캘린더 일정 관련 Controller
 * - 캘린더 일정 리스트 조회
 * - 캘린더 일정 상세 조회
 * - 캘린더 필터링 조회
 *
 * @author 남경민
 */

import com.ssafy.foss.schedule.service.ScheduleService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@RequiredArgsConstructor
@RestController
@RequestMapping("/schedules")
public class ScheduleController {
    private final ScheduleService scheduleService;

    @GetMapping
    public ResponseEntity<?> findAllSchedule(@RequestParam int month) {
        return ResponseEntity.ok().body(scheduleService.findAllSchedule(month));
    }

}
