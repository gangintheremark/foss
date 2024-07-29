package com.ssafy.foss.schedule.controller;

/*
 * @author 남경민
 */

import com.ssafy.foss.member.domain.PrincipalDetail;
import com.ssafy.foss.schedule.service.MenteeService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@Tag(name = "MenteeController", description = "멘티 일정 정보 API")
@RequiredArgsConstructor
@RestController
@RequestMapping("/schedules/mentees")
public class MenteeController {
    private final MenteeService menteeService;

    @Operation(summary = "멘티의 신청한 일정 리스트 조회", description = "멘티가 신청한 일정 리스트를 조회합니다.")
    @GetMapping
    public ResponseEntity<?> findScheduleByMemberId(@RequestParam int month, @AuthenticationPrincipal PrincipalDetail principalDetail) {
        return ResponseEntity.ok().body(menteeService.findScheduleByMemberId(principalDetail.getId(), month));
    }

    @Operation(summary = "멘토정보 및 일정 조회", description = "신청할 멘토의 정보 및 일정 리스트를 조회합니다.")
    @GetMapping("/{mentorId}")
    public ResponseEntity<?> findMentorInfoAndScheduleByMentorId(@PathVariable Long mentorId) {
        return ResponseEntity.ok().body(menteeService.findMentorInfoAndScheduleByMentorId(mentorId));
    }

    @Operation(summary = "모의 면접 신청", description = "모의 면접 일정에 신청합니다.")
    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<?> createApply(@RequestParam("scheduleId") Long scheduleId, @RequestPart("file") MultipartFile file, @AuthenticationPrincipal PrincipalDetail principalDetail) {
        menteeService.createApply(principalDetail.getId(), scheduleId, file);
        return ResponseEntity.ok().build();
    }

    @Operation(summary = "신청한 모의 면접 취소", description = "신청한 모의 면접 일정을 취소합니다.")
    @DeleteMapping("/{scheduleId}")
    public ResponseEntity<?> deleteApply(@PathVariable Long scheduleId, @AuthenticationPrincipal PrincipalDetail principalDetail) {
        menteeService.deleteApply(scheduleId, principalDetail.getId());

        return ResponseEntity.ok().build();
    }
}
