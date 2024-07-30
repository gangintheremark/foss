package com.ssafy.foss.schedule.controller;

/*
 * @author 남경민
 */

import com.ssafy.foss.schedule.service.ScheduleService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@Tag(name = "ScheduleController", description = "일정 정보 API")
@RequiredArgsConstructor
@RestController
@RequestMapping("/schedules")
public class ScheduleController {
    private final ScheduleService scheduleService;

    @Operation(summary = "전체 일정 조회", description = "해당 월과 다음 월의 일정 정보에 대해 조회합니다.")
    @GetMapping
    public ResponseEntity<?> findAllSchedule(@RequestParam int month) {
        return ResponseEntity.ok().body(scheduleService.findAllSchedule(month));
    }
}
