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

import com.ssafy.foss.schedule.dto.MentorScheduleResponse;
import com.ssafy.foss.schedule.service.MentorService;
import com.ssafy.foss.schedule.service.ScheduleService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequiredArgsConstructor
@RestController
@RequestMapping("/schedule/mentor")
public class MentorController {
    private final MentorService mentorService;

    // 멘토의 면접 일정 리스트 조회
    @GetMapping("/{mentor_id}")
    public ResponseEntity<List<MentorScheduleResponse>> findScheduleByMentorId(@PathVariable("mentor_id") Long mentorId,
                                                                               @RequestParam int month) {
        List<MentorScheduleResponse> responses = mentorService.findScheduleByMentorId(mentorId, month);
        if (responses == null) {
            return ResponseEntity.ok(null);
        } else {
            return ResponseEntity.ok(responses);
        }
    }
}