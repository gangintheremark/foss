package com.ssafy.foss.member.controller;

import com.ssafy.foss.jwt.utils.JwtConstants;
import com.ssafy.foss.member.domain.Member;
import com.ssafy.foss.member.domain.PrincipalDetail;
import com.ssafy.foss.member.dto.MemberResponse;
import com.ssafy.foss.member.dto.MentorCardResponse;
import com.ssafy.foss.member.dto.MentorResponse;
import com.ssafy.foss.member.dto.UpdateMemberRequest;
import com.ssafy.foss.member.service.MemberService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Map;

@Tag(name = "MemberController", description = "회원 API")
@RestController
@RequestMapping("/members")
@RequiredArgsConstructor
public class MemberController {
    private final MemberService memberService;

    @Operation(summary = "회원 정보 조회(자신)", description = "회원의 이름, 이메일, 프로필 사진을 조회합니다.")
    @GetMapping
    public ResponseEntity<MemberResponse> findMember(@AuthenticationPrincipal PrincipalDetail principalDetail) {

        return ResponseEntity.ok(memberService.findMember(principalDetail.getId()));
    }

    @Operation(summary = "이메일을 통한 회원 식별자 조회", description = "이메일로 회원의 식별자를 조회합니다.")
    @GetMapping("/search")
    public ResponseEntity<Map<String, Long>> findMemberByEmail(@RequestParam String email) {
        return ResponseEntity.ok(memberService.findIdByEmail(email));
    }

    @Operation(summary = "회원 + 멘토 정보 조회", description = "멘토의 이름, 프로필 사진, 자기소개, 회사명, 부서, 회사 로고를 조회합니다.")
    @GetMapping("/mentors")
    public ResponseEntity<MentorResponse> findMentor(@AuthenticationPrincipal PrincipalDetail principalDetail) {
        return ResponseEntity.ok(memberService.findMentorResponseById(principalDetail.getId()));
    }

    @Operation(summary = "특정 회사에 근무하는 멘토 정보 조회", description = "멘토의 식별자, 이름, 프로필 사진, 자기소개, 회사명, 부서, 회사 로고, 면접 횟수, 별점을 조회합니다.")
    @GetMapping("/mentors/cards/{companyId}")
    public ResponseEntity<List<MentorCardResponse>> findMentorV2(@PathVariable Long companyId) {
        return ResponseEntity.ok(memberService.findMentorCardResponseById(companyId));
    }

    @Operation(summary = "회원 정보 수정", description = "회원의 이메일, 프로필 사진을 수정합니다.")
    @PutMapping(consumes = {MediaType.APPLICATION_JSON_VALUE, MediaType.MULTIPART_FORM_DATA_VALUE})
    public ResponseEntity<Member> updateMember(@AuthenticationPrincipal PrincipalDetail principalDetail,
                                               @RequestPart UpdateMemberRequest updateMemberRequest,
                                               @RequestPart MultipartFile profileImg) {
        return ResponseEntity.ok(memberService.updateMember(principalDetail.getId(), updateMemberRequest, profileImg));
    }

    @Operation(summary = "이메일 중복 체크", description = "이메일의 중복 여부를 체크합니다.")
    @GetMapping("/checkEmail")
    public ResponseEntity<Boolean> checkEmail(@RequestParam String email) {
        return ResponseEntity.ok(memberService.checkEmail(email));
    }

    @Operation(summary = "멘토/멘티 확인", description = "멘토인지 확인합니다.")
    @GetMapping("/isMentor")
    public ResponseEntity<Boolean> checkRole(@AuthenticationPrincipal PrincipalDetail principalDetail) {
        return ResponseEntity.ok(memberService.IsMentor(principalDetail.getId()));
    }

    @Operation(summary = "로그아웃", description = "블랙리스트 처리를 위해 액세스 토큰을 Redis에 저장하고 Redis에 저장되어 있는 RefreshToken을 삭제합니다.")
    @PostMapping("/logout")
    public ResponseEntity<?> logout(HttpServletRequest request) {
        memberService.logout(request.getHeader(JwtConstants.JWT_HEADER), request.getHeader(JwtConstants.JWT_REFRESH_HEADER));
        return ResponseEntity.noContent().build();
    }

}
