package com.ssafy.foss.mypage.controller;

import com.ssafy.foss.member.domain.PrincipalDetail;
import com.ssafy.foss.mentorInfo.domain.MentorInfo;
import com.ssafy.foss.mentorInfo.dto.CreateMentorInfoAndCareerRequest;
import com.ssafy.foss.mypage.service.MyPageService;
import io.swagger.v3.oas.annotations.Operation;
import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

@RequiredArgsConstructor
@RestController
@RequestMapping("/mypage")
public class MyPageController {
    private final MyPageService myPageService;

    @Operation(summary = "경력사항 저장", description = "나의 경력사항을 저장합니다.")
    @PostMapping(consumes = {MediaType.APPLICATION_JSON_VALUE, MediaType.MULTIPART_FORM_DATA_VALUE})
    public ResponseEntity<MentorInfo> createMentorInfoAndCareer(@AuthenticationPrincipal PrincipalDetail principalDetail,
                                                                  @RequestPart CreateMentorInfoAndCareerRequest createMentorInfoAndCareerRequest,
                                                                  @RequestPart(value = "file", required = false) MultipartFile file) {
        myPageService.createMentorInfoAndCareer(principalDetail.getId(), createMentorInfoAndCareerRequest, file);
        return ResponseEntity.ok().build();
    }
}
