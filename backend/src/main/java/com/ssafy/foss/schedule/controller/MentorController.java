package com.ssafy.foss.schedule.controller;

/*
 * 멘토 일정 관련 Controller
 * - 모의 면접 일정 생성 ✅
 * - 면접 일정 리스트 조회 ✅
 * - 면접 일정 상세 조회
 * - 면접 일정 삭제
 * - 면접 신청인원 확정
 *
 * @author 남경민
 */

import com.ssafy.foss.schedule.domain.Apply;
import com.ssafy.foss.schedule.domain.Schedule;
import com.ssafy.foss.schedule.dto.CreateScheduleRequest;
import com.ssafy.foss.schedule.dto.ScheduleAndApplyResponse;
import com.ssafy.foss.schedule.service.MentorService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequiredArgsConstructor
@RestController
@RequestMapping("/schedule/mentor")
public class MentorController {
    private final MentorService mentorService;

    @GetMapping("/{mentor_id}")
    public ResponseEntity<?> findScheduleByMentorId(@PathVariable("mentor_id") Long mentorId,
                                                    @RequestParam int month) {
        List<ScheduleAndApplyResponse> schedules = mentorService.findScheduleAndApplyByMentorId(mentorId, month);

        return ResponseEntity.ok().body(schedules);
    }

    @PostMapping("")
    public ResponseEntity<?> createSchedule(@RequestBody CreateScheduleRequest request) {
        Schedule schedule = mentorService.createSchedule(request);
        return ResponseEntity.ok().body(schedule);
    }

    @GetMapping("/apply/{schedule_id}")
    public ResponseEntity<?> findApplyByScheduleId(@PathVariable("schedule_id") Long scheduleId) {
        List<Apply> applies = mentorService.findApplyByScheduleId(scheduleId);
        return ResponseEntity.ok().body(applies);
    }
}