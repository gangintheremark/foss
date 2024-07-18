package com.ssafy.foss.mentorInfo.controller;

import com.ssafy.foss.member.domain.PrincipalDetail;
import com.ssafy.foss.mentorInfo.domain.MentorInfo;
import com.ssafy.foss.mentorInfo.dto.AddMentorInfoRequest;
import com.ssafy.foss.mentorInfo.dto.MentorInfoResponse;
import com.ssafy.foss.mentorInfo.dto.UpdateMentorInfoRequest;
import com.ssafy.foss.mentorInfo.service.MentorInfoService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;


@RequestMapping("/mentorInfos")
@RestController
@RequiredArgsConstructor
public class MentorInfoController {

    private final MentorInfoService mentorInfoService;

    @PostMapping
    public ResponseEntity<MentorInfo> createMentorInfo(@RequestBody AddMentorInfoRequest addMentorInfoRequest) {
        return ResponseEntity.ok(mentorInfoService.createMentorInfo(addMentorInfoRequest));
    }

    @GetMapping
    public ResponseEntity<MentorInfoResponse> findMentorInfo(@AuthenticationPrincipal PrincipalDetail principalDetail) {
        return ResponseEntity.ok(mentorInfoService.findMentorInfoById(principalDetail.getId()));
    }

    @PutMapping
    public ResponseEntity<MentorInfo> updateMentorInfo(@RequestBody UpdateMentorInfoRequest updateMentorInfoRequest) {
        return ResponseEntity.ok(mentorInfoService.updateMentorInfo(updateMentorInfoRequest));
    }

    @DeleteMapping("/{mentorInfoId}")
    public ResponseEntity<Void> deleteMentorInfo(@PathVariable Long mentorInfoId) {
        mentorInfoService.deleteMentorInfo(mentorInfoId);
        return ResponseEntity.noContent().build();
    }
}
