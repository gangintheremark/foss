package com.ssafy.foss.interview.controller;

import com.ssafy.foss.interview.dto.InterviewDetailResponse;
import com.ssafy.foss.interview.dto.InterviewResponse;
import com.ssafy.foss.interview.service.InterviewService;
import com.ssafy.foss.member.domain.PrincipalDetail;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequestMapping("/interviews")
@RestController
@RequiredArgsConstructor
public class InterviewController {
    private final InterviewService interviewService;

    @GetMapping("/mentors")
    public ResponseEntity<List<InterviewResponse>> findAllByMentor(@AuthenticationPrincipal PrincipalDetail principalDetail) {
        return ResponseEntity.ok(interviewService.findAllByMentor(principalDetail.getId()));
    }

    @GetMapping("/mentees")
    public ResponseEntity<List<InterviewResponse>> findAllByMentee(@AuthenticationPrincipal PrincipalDetail principalDetail) {
        return ResponseEntity.ok(interviewService.findAllByMentee(principalDetail.getId()));
    }

    @GetMapping("/mentors/specific")
    public ResponseEntity<List<InterviewDetailResponse>> findAllByMentorV2(@AuthenticationPrincipal PrincipalDetail principalDetail,
                                                                           @RequestParam String date) {
        return ResponseEntity.ok(interviewService.findAllByMentorAndDate(principalDetail.getId(), date));
    }


}
