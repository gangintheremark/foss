package com.ssafy.foss.mypage.controller;

import com.ssafy.foss.member.domain.Member;
import com.ssafy.foss.member.domain.PrincipalDetail;
import com.ssafy.foss.member.domain.Role;
import com.ssafy.foss.mentorInfo.domain.MentorInfo;
import com.ssafy.foss.mypage.dto.CreateMentorInfoAndCareerRequest;
import com.ssafy.foss.mypage.service.MyPageService;
import io.swagger.v3.oas.annotations.Operation;
import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RequiredArgsConstructor
@RestController
@RequestMapping("/mypage")
public class MyPageController {
    private final MyPageService myPageService;

    @Operation(summary = "멘토정보 및 경력사항 저장", description = "멘토정보와 경력사항을 저장합니다.")
    @GetMapping
    public ResponseEntity<?> findMyPageInfo(@AuthenticationPrincipal PrincipalDetail principalDetail) {
        Member member = myPageService.findMember(principalDetail.getId());

        if(member.getRole().equals(Role.MENTEE)) {
            return ResponseEntity.ok(myPageService.findMenteeResponse(member.getId()));
        } else {
            return ResponseEntity.ok(myPageService.findMentorResponse(member.getId()));
        }
    }

    @Operation(summary = "멘토정보 및 경력사항 저장", description = "멘토정보와 경력사항을 저장합니다.")
    @PostMapping(consumes = {MediaType.APPLICATION_JSON_VALUE, MediaType.MULTIPART_FORM_DATA_VALUE})
    public ResponseEntity<?> createMentorInfoAndCareer(@AuthenticationPrincipal PrincipalDetail principalDetail,
                                                                @RequestPart CreateMentorInfoAndCareerRequest createMentorInfoAndCareerRequest, @RequestPart(value = "file", required = false) MultipartFile file) {
        myPageService.createMentorInfoAndCareer(principalDetail.getId(), createMentorInfoAndCareerRequest, file);
        return ResponseEntity.ok().build();
    }
}
