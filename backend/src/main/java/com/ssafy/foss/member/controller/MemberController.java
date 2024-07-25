package com.ssafy.foss.member.controller;

import com.ssafy.foss.member.domain.Member;
import com.ssafy.foss.member.domain.PrincipalDetail;
import com.ssafy.foss.member.dto.MemberResponse;
import com.ssafy.foss.member.dto.UpdateMemberRequest;
import com.ssafy.foss.member.service.MemberService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/members")
@RequiredArgsConstructor
public class MemberController {
    private final MemberService memberService;

    @GetMapping
    public ResponseEntity<MemberResponse> findMember(@AuthenticationPrincipal PrincipalDetail principalDetail) {

        return ResponseEntity.ok(memberService.findMember(principalDetail.getId()));
    }

    @PutMapping(consumes = {MediaType.APPLICATION_JSON_VALUE, MediaType.MULTIPART_FORM_DATA_VALUE})
    public ResponseEntity<Member> updateMember(@AuthenticationPrincipal PrincipalDetail principalDetail,
                                               @RequestPart UpdateMemberRequest updateMemberRequest,
                                               @RequestPart MultipartFile profileImg) {
//        awsS3Service.uploadProfile(profileImg);
        return ResponseEntity.ok(memberService.updateMember(principalDetail.getId(), updateMemberRequest));
    }

}
