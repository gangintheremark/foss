package com.ssafy.foss.mypage.service;

import com.ssafy.foss.career.dto.CareerResponse;
import com.ssafy.foss.career.service.CareerService;
import com.ssafy.foss.member.domain.Member;
import com.ssafy.foss.member.domain.Role;
import com.ssafy.foss.member.dto.MentorResponse;
import com.ssafy.foss.member.service.MemberService;
import com.ssafy.foss.mypage.dto.CreateMentorInfoAndCareerRequest;
import com.ssafy.foss.mentorInfo.service.MentorInfoService;
import com.ssafy.foss.mypage.dto.MenteeMyPageResponse;
import com.ssafy.foss.mypage.dto.MentorMyPageResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Transactional(readOnly = true)
@RequiredArgsConstructor
@Service
public class MyPageService {

    private final MentorInfoService mentorInfoService;
    private final MemberService memberService;
    private final CareerService careerService;

    public Member findMember(Long memberId) {
        return memberService.findById(memberId);
    }

    public MenteeMyPageResponse findMenteeResponse(Long memberId) {
        Member member = memberService.findById(memberId);
        return buildMenteeMyPageResponse(member);
    }

    public MentorMyPageResponse findMentorResponse(Long memberId) {
        Member member = memberService.findById(memberId);
        List<CareerResponse> careers = careerService.findAllCareers(memberId);
        MentorResponse mentorResponse = memberService.findMentorResponseById(memberId);
        return buildMentorMyPageResponse(member, careers, mentorResponse);
    }

    @Transactional
    public void createMentorInfoAndCareer(Long memberId, CreateMentorInfoAndCareerRequest createMentorInfoAndCareerRequest, MultipartFile file) {
        mentorInfoService.createMentorInfo(memberId, createMentorInfoAndCareerRequest.getSelfProduce(), file);
        careerService.createCareers(memberId, createMentorInfoAndCareerRequest.getAddCareerRequests());
        Member member = memberService.findById(memberId);
        member.setRole(Role.MENTOR);
    }

    private MenteeMyPageResponse buildMenteeMyPageResponse(Member member) {
        return MenteeMyPageResponse.builder()
                .name(member.getName())
                .email(member.getEmail())
                .profileUrl(member.getProfileImg())
                .role(member.getRole().toString())
                .build();
    }

    private MentorMyPageResponse buildMentorMyPageResponse(Member member, List<CareerResponse> careers, MentorResponse mentorResponse) {
        return MentorMyPageResponse.builder()
                .name(member.getName())
                .email(member.getEmail())
                .profileImg(member.getProfileImg())
                .role(member.getRole().toString())
                .mentorInfo(buildMentorInfo(mentorResponse, careers))
                .build();
    }

    private MentorMyPageResponse.MentorInfo buildMentorInfo(MentorResponse mentorResponse,  List<CareerResponse> careers) {
        return MentorMyPageResponse.MentorInfo.builder()
                .selfProduce(mentorResponse.getSelfProduce())
                .fileUrl(mentorResponse.getFileUrl())
                .careers(careers)
                .build();
    }
}
