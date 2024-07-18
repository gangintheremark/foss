package com.ssafy.foss.member.service;

import com.ssafy.foss.member.domain.Member;
import com.ssafy.foss.member.dto.MemberResponse;
import com.ssafy.foss.member.dto.UpdateMemberRequest;
import com.ssafy.foss.member.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class MemberService {
    private final MemberRepository memberRepository;

    public MemberResponse findById(Long id) {
        Member member = memberRepository.findById(id).orElseThrow(
                () -> new RuntimeException("해당 식별자를 가진 사용자가 존재하지 않습니다.")
        );

        return mapToMemberResponse(member);
    }

    @Transactional
    public Member updateMember(Long id, UpdateMemberRequest updateMemberRequest) {
        Member member = memberRepository.findById(id).orElseThrow(
                () -> new RuntimeException("해당 식별자를 가진 사용자가 존재하지 않습니다.")
        );
        member.change(updateMemberRequest);

        return member;
    }

    private static MemberResponse mapToMemberResponse(Member member) {
        return MemberResponse.builder()
                .name(member.getName())
                .email(member.getEmail())
                .profileImg(member.getProfileImg()).build();
    }

}
