package com.ssafy.foss.mypage.service;

import com.ssafy.foss.career.service.CareerService;
import com.ssafy.foss.member.domain.Member;
import com.ssafy.foss.member.domain.Role;
import com.ssafy.foss.member.service.MemberService;
import com.ssafy.foss.mypage.dto.CreateMentorInfoAndCareerRequest;
import com.ssafy.foss.mentorInfo.service.MentorInfoService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

@Transactional(readOnly = true)
@RequiredArgsConstructor
@Service
public class MyPageService {

    private final MentorInfoService mentorInfoService;
    private final MemberService memberService;
    private final CareerService careerService;

    @Transactional
    public void createMentorInfoAndCareer(Long memberId, CreateMentorInfoAndCareerRequest createMentorInfoAndCareerRequest, MultipartFile file) {
        mentorInfoService.createMentorInfo(memberId, createMentorInfoAndCareerRequest.getSelfProduce(), file);
        careerService.createCareers(memberId, createMentorInfoAndCareerRequest.getAddCareerRequests());
        Member member = memberService.findById(memberId);
        member.setRole(Role.MENTOR);
    }
}
