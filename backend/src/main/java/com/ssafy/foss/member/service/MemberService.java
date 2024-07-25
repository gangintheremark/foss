package com.ssafy.foss.member.service;

import com.ssafy.foss.member.domain.Member;
import com.ssafy.foss.member.dto.MemberResponse;
import com.ssafy.foss.member.dto.MentorResponse;
import com.ssafy.foss.member.dto.UpdateMemberRequest;
import com.ssafy.foss.member.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class MemberService {
    private final MemberRepository memberRepository;

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

    public MentorResponse findMentorResponseById(Long id) {
        Pageable pageable = PageRequest.of(0, 1);
        List<MentorResponse> mentorResponse = memberRepository.findMentorResponseById(id, pageable);

        return mentorResponse.get(0);
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
