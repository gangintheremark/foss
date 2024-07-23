package com.ssafy.foss.schedule.controller;

/*
 * 멘티 일정 관련 Controller
 * - 모의 면접 신청
 * - 면접 신청 취소
 *
 * @author 남경민
 */

import com.ssafy.foss.schedule.dto.CreateApplyRequest;
import com.ssafy.foss.schedule.service.MenteeService;
import com.ssafy.foss.schedule.service.ScheduleService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RequiredArgsConstructor
@RestController
@RequestMapping("/schedules/mentees")
public class MenteeController {
    private final MenteeService menteeService;

    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<?> createApply(@RequestPart CreateApplyRequest request,
                                         @RequestPart("file") MultipartFile file) {
        return ResponseEntity.ok().body(menteeService.createApply(request, file));
    }
}
