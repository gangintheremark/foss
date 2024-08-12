package com.ssafy.foss.schedule.controller;

/*
 * @author 남경민
 */

import com.ssafy.foss.error.dto.ResponseErrorDto;
import com.ssafy.foss.exception.ScheduleConfilctException;
import com.ssafy.foss.member.domain.PrincipalDetail;
import com.ssafy.foss.schedule.dto.request.ConfirmScheduleRequest;
import com.ssafy.foss.schedule.dto.request.CreateScheduleRequest;
import com.ssafy.foss.schedule.service.MentorService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@Tag(name = "MentorController", description = "멘토 일정 정보 API")
@RequiredArgsConstructor
@RestController
@RequestMapping("/schedules/mentors")
public class MentorController {
    private final MentorService mentorService;

    @Operation(summary = "멘토 일정 생성", description = "멘토가 모의 면접의 일정을 등록합니다.")
    @PostMapping
    public ResponseEntity<?> createSchedule(@AuthenticationPrincipal PrincipalDetail principalDetail, @RequestBody CreateScheduleRequest request) {
        return ResponseEntity.ok().body(mentorService.createSchedule(principalDetail.getId(), request));
    }

    @Operation(summary = "멘토 일정 및 지원자 리스트 조회", description = "멘토가 등록한 일정과 해당 일정의 지원자를 조회합니다.")
    @GetMapping
    public ResponseEntity<?> findScheduleAndApplyByMentorId(@AuthenticationPrincipal PrincipalDetail principalDetail,
                                                              @RequestParam int month) {
        return ResponseEntity.ok().body(mentorService.findScheduleAndApplyByMentorId(principalDetail.getId(), month));
    }

    @Operation(summary = "멘토 일정 확정", description = "멘토가 모의 면접의 일정을 확정합니다")
    @PostMapping("/confirm")
    public ResponseEntity<?> confirmSchedule(@AuthenticationPrincipal PrincipalDetail principalDetail, @RequestBody ConfirmScheduleRequest request) {
        try {
            mentorService.confirmSchedule(principalDetail.getId(), request);
            return ResponseEntity.ok().build();
        } catch (ScheduleConfilctException e) {
            ResponseErrorDto errorDto = ResponseErrorDto.builder()
                    .code("409")
                    .message(e.getMessage())
                    .build();
            return ResponseEntity.status(HttpStatus.CONFLICT).body(errorDto);
        }
    }

    @Operation(summary = "멘토 일정 삭제", description = "멘토가 일정을 취소합니다.")
    @DeleteMapping("/{scheduleId}")
    public ResponseEntity<?> deleteSchedule(@PathVariable Long scheduleId) {
        mentorService.deleteSchedule(scheduleId);
        return ResponseEntity.ok().build();
    }
}