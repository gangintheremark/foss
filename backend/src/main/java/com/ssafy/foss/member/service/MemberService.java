package com.ssafy.foss.member.service;

import com.ssafy.foss.member.domain.Member;
import com.ssafy.foss.member.dto.MemberResponse;
import com.ssafy.foss.member.dto.MentorResponse;
import com.ssafy.foss.member.dto.UpdateMemberRequest;
import com.ssafy.foss.member.repository.MemberRepository;
import com.ssafy.foss.s3.service.AwsS3Service;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class MemberService {
    private final MemberRepository memberRepository;
    private final AwsS3Service awsS3Service;

    public MemberResponse findMember(Long id) {
        Member member = findById(id);
        return mapToMemberResponse(member);
    }

    public Member findById(Long id) {
        Member member = memberRepository.findById(id).orElseThrow(
                () -> new RuntimeException("해당 식별자를 가진 사용자가 존재하지 않습니다.")
        );

        return member;
    }

    public Map<String, Long> findIdByEmail(String email) {
        Member member = memberRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("해당 이메일을 가진 사용자가 존재하지 않습니다."));
        HashMap<String, Long> map = new HashMap<>();
        map.put("id", member.getId());

        return map;
    }

    public MentorResponse findMentorResponseById(Long id) {
        Pageable pageable = PageRequest.of(0, 1);
        List<MentorResponse> mentorResponse = memberRepository.findMentorResponseById(id, pageable);

        return mentorResponse.get(0);
    }

    @Transactional
    public Member updateMember(Long id, UpdateMemberRequest updateMemberRequest, MultipartFile profileImg) {
        Member member = memberRepository.findById(id).orElseThrow(
                () -> new RuntimeException("해당 식별자를 가진 사용자가 존재하지 않습니다.")
        );

        awsS3Service.deleteFile(member.getProfileImg());
        String profileImgSrc = awsS3Service.uploadProfile(profileImg);
        member.change(updateMemberRequest, profileImgSrc);

        return member;
    }

    private static MemberResponse mapToMemberResponse(Member member) {
        return MemberResponse.builder()
                .name(member.getName())
                .email(member.getEmail())
                .profileImg(member.getProfileImg()).build();
    }

}
