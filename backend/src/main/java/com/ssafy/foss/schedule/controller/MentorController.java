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

import com.ssafy.foss.schedule.dto.CreateScheduleRequest;
import com.ssafy.foss.schedule.service.MentorService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RequiredArgsConstructor
@RestController
@RequestMapping("/schedules/mentors")
public class MentorController {
    private final MentorService mentorService;

    @GetMapping("/{mentor_id}")
    public ResponseEntity<?> findScheduleAndByScheduleId(@PathVariable("mentor_id") Long mentorId,
                                                    @RequestParam int month) {
        return ResponseEntity.ok().body(mentorService.findScheduleAndApplyByMentorId(mentorId, month));
    }

    @PostMapping("")
    public ResponseEntity<?> createSchedule(@RequestBody CreateScheduleRequest request) {
        return ResponseEntity.ok().body(mentorService.createSchedule(request));
    }
}