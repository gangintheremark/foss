package com.ssafy.foss.schedule.controller;

/*
 * @author 남경민
 */

import com.ssafy.foss.member.domain.PrincipalDetail;
import com.ssafy.foss.schedule.dto.request.ConfirmScheduleRequest;
import com.ssafy.foss.schedule.service.MentorService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RequiredArgsConstructor
@RestController
@RequestMapping("/schedules/mentors")
public class MentorController {
    private final MentorService mentorService;

    @PostMapping
    public ResponseEntity<?> createSchedule(@AuthenticationPrincipal PrincipalDetail principalDetail, @RequestBody String date) {
        return ResponseEntity.ok().body(mentorService.createSchedule(principalDetail.getId(), date));
    }


    @GetMapping
    public ResponseEntity<?> findScheduleAndApplyByMentorId(@AuthenticationPrincipal PrincipalDetail principalDetail,
                                                              @RequestParam int month) {
        return ResponseEntity.ok().body(mentorService.findScheduleAndApplyByMentorId(principalDetail.getId(), month));
    }

    @PostMapping("/confirm")
    public ResponseEntity<?> confirmSchedule(@AuthenticationPrincipal PrincipalDetail principalDetail, @RequestBody ConfirmScheduleRequest request) {
        mentorService.confirmSchedule(principalDetail.getId(), request);
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/{scheduleId}")
    public ResponseEntity<?> deleteSchedule(@PathVariable Long scheduleId) {
        mentorService.deleteSchedule(scheduleId);
        return ResponseEntity.ok().build();
    }
}