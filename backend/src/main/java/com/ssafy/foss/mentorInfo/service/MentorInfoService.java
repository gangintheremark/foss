package com.ssafy.foss.mentorInfo.service;

import com.ssafy.foss.member.domain.Member;
import com.ssafy.foss.member.service.MemberService;
import com.ssafy.foss.mentorInfo.domain.MentorInfo;
import com.ssafy.foss.mentorInfo.dto.AddMentorInfoRequest;
import com.ssafy.foss.mentorInfo.dto.MentorInfoResponse;
import com.ssafy.foss.mentorInfo.dto.UpdateMentorInfoRequest;
import com.ssafy.foss.mentorInfo.repository.MentorInfoRepository;
import com.ssafy.foss.s3.service.AwsS3Service;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

@Transactional(readOnly = true)
@RequiredArgsConstructor
@Service
public class MentorInfoService {
    private final MentorInfoRepository mentorInfoRepository;
    private final MemberService memberService;
    private final AwsS3Service awsS3Service;

    @Transactional
    public MentorInfo createMentorInfo(Long memberId, AddMentorInfoRequest addMentorInfoRequest, MultipartFile file) {
        Member member = memberService.findById(memberId);
        String fileUrl = awsS3Service.uploadProfile(file);
        return mentorInfoRepository.save(buildMentorInfo(member, fileUrl, addMentorInfoRequest));
    }

    public MentorInfoResponse findMentorInfoById(Long memberId) {
        Long id = findMentorInfo(memberId).getId();
        MentorInfo findMentorInfo = mentorInfoRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("식별자가 " + id + "인 멘토 정보를 찾을 수 없습니다."));

        return new MentorInfoResponse(findMentorInfo.getId(), findMentorInfo.getSelfProduce(), findMentorInfo.getFileUrl());
    }

    @Transactional
    public MentorInfoResponse updateMentorInfo(UpdateMentorInfoRequest updateMentorInfoRequest, MultipartFile file) {
        Long id = updateMentorInfoRequest.getId();
        MentorInfo findMentorInfo = mentorInfoRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("식별자가 " + id + "인 멘토 정보를 찾을 수 없습니다."));

        awsS3Service.deleteFile(findMentorInfo.getFileUrl());
        String fileUrl = awsS3Service.uploadProfile(file);

        findMentorInfo.change(updateMentorInfoRequest, fileUrl);
        return new MentorInfoResponse(findMentorInfo.getId(), findMentorInfo.getSelfProduce(), findMentorInfo.getFileUrl());
    }

    @Transactional
    public void deleteMentorInfo(Long id) {
        mentorInfoRepository.deleteById(id);
    }

    public MentorInfo findMentorInfo(Long memberId) {
        return mentorInfoRepository.findByMemberId(memberId).orElseThrow(
                () -> new RuntimeException("식별자가 " + memberId + "인 멘토 정보를 찾을 수 없습니다."));
    }

    private MentorInfo buildMentorInfo(Member member, String fileUrl, AddMentorInfoRequest addMentorInfoRequest) {
        return MentorInfo.builder()
                .member(member)
                .selfProduce(addMentorInfoRequest.getSelfProduce())
                .fileUrl(fileUrl)
                .build();
    }
}
