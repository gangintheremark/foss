package com.ssafy.foss.mypage.service;

import com.ssafy.foss.apply.service.ApplyService;
import com.ssafy.foss.career.dto.CareerResponse;
import com.ssafy.foss.career.service.CareerService;
import com.ssafy.foss.interview.domain.Interview;
import com.ssafy.foss.interview.dto.MentorInterviewResponse;
import com.ssafy.foss.interview.service.InterviewService;
import com.ssafy.foss.member.domain.Member;
import com.ssafy.foss.member.domain.Role;
import com.ssafy.foss.member.dto.MentorResponse;
import com.ssafy.foss.member.dto.UpdateMemberRequest;
import com.ssafy.foss.member.service.MemberService;
import com.ssafy.foss.mentorInfo.domain.MentorInfo;
import com.ssafy.foss.mypage.dto.ChangeProfileResponse;
import com.ssafy.foss.mypage.dto.CreateMentorInfoAndCareerRequest;
import com.ssafy.foss.mentorInfo.service.MentorInfoService;
import com.ssafy.foss.mypage.dto.MenteeMyPageResponse;
import com.ssafy.foss.mypage.dto.MentorMyPageResponse;
import com.ssafy.foss.respondent.domain.Respondent;
import com.ssafy.foss.respondent.service.RespondentService;
import com.ssafy.foss.schedule.domain.Schedule;
import com.ssafy.foss.schedule.service.ScheduleService;
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
    private final ScheduleService scheduleService;
    private final InterviewService interviewService;
    private final RespondentService respondentService;
    private final ApplyService applyService;

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
        memberService.updateRole(memberId, Role.MENTOR);
    }

    private MenteeMyPageResponse buildMenteeMyPageResponse(Member member) {
        return MenteeMyPageResponse.builder()
                .name(member.getName())
                .email(member.getEmail())
                .profileImg(member.getProfileImg())
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

    @Transactional
    public ChangeProfileResponse updateMember(Long id, UpdateMemberRequest updateMemberRequest, MultipartFile profileImg) {
        Member member = memberService.updateMember(id, updateMemberRequest, profileImg);

        String selfProduce = null;
        List<CareerResponse> careerResponses = null;

        if (updateMemberRequest.getSelfProduce() != null) {
            MentorInfo mentorInfo = mentorInfoService.findMentorInfo(id);
            mentorInfo.changeSelfProduce(updateMemberRequest.getSelfProduce());
            selfProduce = updateMemberRequest.getSelfProduce();
            careerResponses = careerService.findAllCareers(id);
        }

        return ChangeProfileResponse.builder()
                .name(member.getName())
                .email(member.getEmail())
                .role(member.getRole().toString())
                .profileImg(member.getProfileImg())
                .mentorInfo(buildToMentorInfo(selfProduce, careerResponses))
                .build();
    }

    private ChangeProfileResponse.MentorInfo buildToMentorInfo(String selfProduce, List<CareerResponse> careerResponses) {
        return ChangeProfileResponse.MentorInfo.builder()
                .selfProduce(selfProduce)
                .careers(careerResponses)
                .build();
    }

    @Transactional
    public void resetMentorInfo(Long id) {
        List<Schedule> schedules = scheduleService.findByMemberId(id);
        for(Schedule schedule : schedules) {
            applyService.deleteByScheduleId(schedule.getId());
            scheduleService.deleteById(schedule.getId());
        }

        List<MentorInterviewResponse> interviews = interviewService.findAllByMentor(id);
        for(MentorInterviewResponse interviewResponse : interviews) {
            respondentService.deleteByInterviewId(interviewResponse.getInterviewId());
            interviewService.deleteById(interviewResponse.getInterviewId());
        }
        careerService.deleteCareerByMentorId(id);
        mentorInfoService.deleteByMemberId(id);
        memberService.updateRole(id, Role.MENTEE);
    }
}
