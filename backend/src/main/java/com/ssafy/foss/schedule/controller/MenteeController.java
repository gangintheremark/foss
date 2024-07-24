package com.ssafy.foss.schedule.controller;

/*
 * 멘티 일정 관련 Controller
 * - 모의 면접 신청
 * - 면접 신청 취소
 *
 * @author 남경민
 */

import com.ssafy.foss.member.domain.PrincipalDetail;
import com.ssafy.foss.schedule.service.MenteeService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RequiredArgsConstructor
@RestController
@RequestMapping("/schedules/mentees")
public class MenteeController {
    private final MenteeService menteeService;

    @GetMapping
    public ResponseEntity<?> findScheduleByMemberId(@RequestParam int month, @AuthenticationPrincipal PrincipalDetail principalDetail) {
        return ResponseEntity.ok().body(menteeService.findScheduleByMemberId(month, principalDetail.getId()));
    }

    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<?> createApply(@RequestParam("scheduleId") Long scheduleId, @RequestPart("file") MultipartFile file, @AuthenticationPrincipal PrincipalDetail principalDetail) {
        return ResponseEntity.ok().body(menteeService.createApply(principalDetail.getId(), scheduleId, file));
    }

    @GetMapping("{mentorId}")
    public ResponseEntity<?> findScheduleByMentorId(@PathVariable Long mentorId) {
        return ResponseEntity.ok().body(menteeService.findScheduleByMentorId(mentorId));
    }

    @DeleteMapping("/{scheduleId}")
    public ResponseEntity<?> deleteApply(@PathVariable Long scheduleId, @AuthenticationPrincipal PrincipalDetail principalDetail) {
        menteeService.deleteApply(scheduleId, principalDetail.getId());
        return ResponseEntity.noContent().build();
    }
}
