package com.ssafy.foss.member.service;

import com.ssafy.foss.career.service.CareerService;
import com.ssafy.foss.company.service.CompanyService;
import com.ssafy.foss.interview.service.InterviewService;
import com.ssafy.foss.member.domain.Member;
import com.ssafy.foss.member.domain.Role;
import com.ssafy.foss.member.dto.MemberResponse;
import com.ssafy.foss.member.dto.MentorCardResponse;
import com.ssafy.foss.member.dto.MentorResponse;
import com.ssafy.foss.member.dto.UpdateMemberRequest;
import com.ssafy.foss.member.repository.MemberRepository;
import com.ssafy.foss.mentorInfo.domain.MentorInfo;
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
import java.util.stream.Collectors;

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

    public List<MentorCardResponse> findMentorCardResponseById(Long companyId) {
        List<MentorResponse> mentorResponses = memberRepository.findMentorResponseByCompanyId(companyId);
        List<MentorCardResponse> mentorCardResponses = mentorResponses.stream()
                .map(mentorResponse -> {
                    // 나중에 별점 추가
                    Double rating = memberRepository.findRatingById(mentorResponse.getId());
                    rating = Math.round(rating * 10) / 10.0;

                    Integer count = memberRepository.findInterviewCountByMemberId(mentorResponse.getId());
                    return mapToMentorCardResponse(mentorResponse, count, rating);
                }).collect(Collectors.toList());

        return mentorCardResponses;
    }

    public boolean checkEmail (String email) {
        return memberRepository.existsByEmail(email);
    }

    private static MentorCardResponse mapToMentorCardResponse(MentorResponse mentorResponse, Integer interviewCnt, Double rating) {
        return MentorCardResponse.builder()
                .memberId(mentorResponse.getId())
                .name(mentorResponse.getName())
                .profileImg(mentorResponse.getProfileImg())
                .selfProduce(mentorResponse.getSelfProduce())
                .companyName(mentorResponse.getCompanyName())
                .logoImg(mentorResponse.getLogoImg())
                .department(mentorResponse.getDepartment())
                .interviewCnt(interviewCnt)
                .rating(rating).build();
    }

    @Transactional
    public Member updateMember(Long id, UpdateMemberRequest updateMemberRequest, MultipartFile profileImg) {
        Member member = memberRepository.findById(id).orElseThrow(
                () -> new RuntimeException("해당 식별자를 가진 사용자가 존재하지 않습니다.")
        );

        if ("empty-profile-img.png".equals(profileImg.getOriginalFilename())) {
            member.change(updateMemberRequest);
        } else {
            awsS3Service.deleteFile(member.getProfileImg());
            String profileImgSrc = awsS3Service.uploadProfile(profileImg);
            member.change(updateMemberRequest, profileImgSrc);
            member.change(updateMemberRequest);
        }

        return member;
    }


    @Transactional
    public Member updateRole(Long id, Role role) {
        Member findMember = findById(id);
        findMember.setRole(role);

        return findMember;
    }

    private static MemberResponse mapToMemberResponse(Member member) {
        return MemberResponse.builder()
                .name(member.getName())
                .email(member.getEmail())
                .profileImg(member.getProfileImg()).build();
    }

    public Boolean IsMentor(Long id) {
        Member member = memberRepository.findById(id).orElseThrow();
        return member.getRole().equals(Role.MENTOR);

    }
}
