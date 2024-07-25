package com.ssafy.foss.mentorInfo.service;

import com.ssafy.foss.member.domain.Member;
import com.ssafy.foss.member.service.MemberService;
import com.ssafy.foss.mentorInfo.domain.MentorInfo;
import com.ssafy.foss.mentorInfo.dto.AddMentorInfoRequest;
import com.ssafy.foss.mentorInfo.dto.MentorInfoResponse;
import com.ssafy.foss.mentorInfo.dto.UpdateMentorInfoRequest;
import com.ssafy.foss.mentorInfo.repository.MentorInfoRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Transactional(readOnly = true)
@RequiredArgsConstructor
@Service
public class MentorInfoService {
    private final MentorInfoRepository mentorInfoRepository;
    private final MemberService memberService;

    @Transactional
    public MentorInfo createMentorInfo(Long memberId, AddMentorInfoRequest addMentorInfoRequest) {
        Member member = memberService.findById(memberId);
        return mentorInfoRepository.save(buildMentorInfo(member, addMentorInfoRequest));
    }

    public MentorInfoResponse findMentorInfoById(Long memberId) {
        Long id = findMentorInfo(memberId).getId();
        MentorInfo findMentorInfo = mentorInfoRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("식별자가 " + id + "인 멘토 정보를 찾을 수 없습니다."));

        return new MentorInfoResponse(findMentorInfo.getId(), findMentorInfo.getCompanyName(), findMentorInfo.getDepartment()
                , findMentorInfo.getYears(), findMentorInfo.getSelfProduce());
    }

    @Transactional
    public MentorInfoResponse updateMentorInfo(UpdateMentorInfoRequest updateMentorInfoRequest) {
        Long id = updateMentorInfoRequest.getId();
        MentorInfo findMentorInfo = mentorInfoRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("식별자가 " + id + "인 멘토 정보를 찾을 수 없습니다."));

        findMentorInfo.change(updateMentorInfoRequest);

        return new MentorInfoResponse(findMentorInfo.getId(), findMentorInfo.getCompanyName(), findMentorInfo.getDepartment()
                , findMentorInfo.getYears(), findMentorInfo.getSelfProduce());
    }

    @Transactional
    public void deleteMentorInfo(Long id) {
        mentorInfoRepository.deleteById(id);
    }

    public MentorInfo findMentorInfo(Long memberId) {
        return mentorInfoRepository.findByMemberId(memberId).orElseThrow(
                () -> new RuntimeException("식별자가 " + memberId + "인 멘토 정보를 찾을 수 없습니다."));
    }

    private MentorInfo buildMentorInfo(Member member, AddMentorInfoRequest addMentorInfoRequest) {
        return MentorInfo.builder()
                .member(member)
                .companyName(addMentorInfoRequest.getCompanyName())
                .department(addMentorInfoRequest.getDepartment())
                .years(addMentorInfoRequest.getYears())
                .selfProduce(addMentorInfoRequest.getSelfProduce())
                .build();
    }
}
