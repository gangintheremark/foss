package com.ssafy.foss.mentorInfo.controller;

import com.ssafy.foss.member.domain.PrincipalDetail;
import com.ssafy.foss.mentorInfo.domain.MentorInfo;
import com.ssafy.foss.mentorInfo.dto.AddMentorInfoRequest;
import com.ssafy.foss.mentorInfo.dto.CreateMentorInfoAndCareerRequest;
import com.ssafy.foss.mentorInfo.dto.MentorInfoResponse;
import com.ssafy.foss.mentorInfo.dto.UpdateMentorInfoRequest;
import com.ssafy.foss.mentorInfo.service.MentorInfoService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;


@Tag(name = "MentorInfoController", description = "멘토 정보 API")
@RequestMapping("/mentorInfos")
@RestController
@RequiredArgsConstructor
public class MentorInfoController {

    private final MentorInfoService mentorInfoService;

    @Operation(summary = "멘토 정보 생성", description = "멘토의 회사 정보, 자기소개를 생성합니다.")
    @PostMapping(consumes = {MediaType.APPLICATION_JSON_VALUE, MediaType.MULTIPART_FORM_DATA_VALUE})
    public ResponseEntity<MentorInfo> createMentorInfo(@AuthenticationPrincipal PrincipalDetail principalDetail,
                                                       @RequestPart CreateMentorInfoAndCareerRequest createMentorInfoAndCareerRequest,
                                                       @RequestPart MultipartFile file) {
        return ResponseEntity.ok().build();
    }

    @Operation(summary = "멘토 정보 조회", description = "멘토의 회사 정보, 자기소개를 조회합니다.")
    @GetMapping
    public ResponseEntity<MentorInfoResponse> findMentorInfo(@AuthenticationPrincipal PrincipalDetail principalDetail) {
        return ResponseEntity.ok(mentorInfoService.findMentorInfoById(principalDetail.getId()));
    }

    @Operation(summary = "멘토 정보 수정", description = "멘토의 자기소개를 수정합니다.")
    @PutMapping(consumes = {MediaType.APPLICATION_JSON_VALUE, MediaType.MULTIPART_FORM_DATA_VALUE})
    public ResponseEntity<?> updateMentorInfo(@RequestPart UpdateMentorInfoRequest updateMentorInfoRequest,
                                              @RequestPart MultipartFile file) {
        return ResponseEntity.ok(mentorInfoService.updateMentorInfo(updateMentorInfoRequest, file));
    }

    @Operation(summary = "멘토 정보 삭제", description = "멘토의 자기소개를 삭제합니다.")
    @DeleteMapping("/{mentorInfoId}")
    public ResponseEntity<Void> deleteMentorInfo(@PathVariable Long mentorInfoId) {
        mentorInfoService.deleteMentorInfo(mentorInfoId);
        return ResponseEntity.noContent().build();
    }
}
