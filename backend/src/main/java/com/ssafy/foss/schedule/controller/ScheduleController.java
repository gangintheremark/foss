package com.ssafy.foss.schedule.controller;

/*
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
