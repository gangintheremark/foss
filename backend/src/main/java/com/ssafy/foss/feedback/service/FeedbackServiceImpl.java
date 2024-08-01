package com.ssafy.foss.feedback.service;

import com.ssafy.foss.feedback.domain.MenteeFeedback;
import com.ssafy.foss.feedback.domain.MenteeFeedbackId;
import com.ssafy.foss.feedback.dto.request.FeedbackRatingRequest;
import com.ssafy.foss.feedback.dto.request.MenteeFeedbackRequest;
import com.ssafy.foss.feedback.dto.response.*;
import com.ssafy.foss.feedback.repository.MenteeFeedbackRepository;
import com.ssafy.foss.interview.repository.InterviewRepository;
import com.ssafy.foss.member.domain.Member;
import com.ssafy.foss.member.repository.MemberRepository;
import com.ssafy.foss.respondent.repository.RespondentRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@RequiredArgsConstructor
@Service
@Transactional(readOnly = true)
public class FeedbackServiceImpl implements FeedbackService {
    private final InterviewRepository interviewRepository;
    private final RespondentRepository respondentRepository;
    private final MenteeFeedbackRepository menteeFeedbackRepository;
    private final MemberRepository memberRepository;

    @Override
    public List<MenteeFeedbackPendingResponse> findPendingMenteeFeedback(Long memberId) {
        List<MenteeFeedbackPendingResponse> pendingResponses = interviewRepository.findPendingFeedbackInterviews(memberId);

        for (MenteeFeedbackPendingResponse response : pendingResponses) {
            List<FeedbackMenteeInfoResponse> menteeInfos = respondentRepository.findOtherRespondents(response.getInterviewId(), memberId);
            for (FeedbackMenteeInfoResponse menteeInfo : menteeInfos) {
                response.addMenteeInfo(menteeInfo);
            }
        }

        return pendingResponses;
    }

    @Override
    @Transactional
    public void createMenteeFeedback(List<MenteeFeedbackRequest> menteeFeedbackRequests, Long memberId) {
        for (MenteeFeedbackRequest menteeFeedbackRequest : menteeFeedbackRequests) {
            menteeFeedbackRepository.save(buildAndSaveMenteeFeedback(menteeFeedbackRequest, memberId));
        }
    }

    @Override
    public void updateMenteeEvaluate(FeedbackRatingRequest feedbackRatingRequest) {
        MenteeFeedbackId menteeFeedbackId = new MenteeFeedbackId(feedbackRatingRequest.getRespondentId(), feedbackRatingRequest.getMenteeId());
        MenteeFeedback menteeFeedback = menteeFeedbackRepository.findById(menteeFeedbackId).orElseThrow();
        menteeFeedback.updateConfirmEvaluated();

        Member member = memberRepository.findById(feedbackRatingRequest.getMenteeId())
                .orElseThrow(() -> new EntityNotFoundException("Member not found"));
        member.adjustTemperature(feedbackRatingRequest.getRating());
        memberRepository.save(member);
    }

    @Override
    public List<FeedbackListResponse> findFeedbackListByMenteeId(Long memberId) {
        return respondentRepository.findFeedbackListByMenteeId(memberId);
    }

    @Override
    public FeedbackDetailResponse findFeedbackDetailByFeedbackId(Long respondentId) {
        return respondentRepository.findFeedbackDetailByFeedbackId(respondentId);
    }

    @Override
    public List<MentorFeedbackPendingResponse> findPendingMentorFeedback(Long mentorId) {
        List<MentorFeedbackPendingResponse> pendingResponses = interviewRepository.findPendingMentorFeedback(mentorId);

        for (MentorFeedbackPendingResponse response : pendingResponses) {
            List<FeedbackMenteeInfoResponse> menteeInfos = respondentRepository.findAllRespondentsByInterviewId(response.getInterviewId());
            response.setMenteeInfos(menteeInfos);
        }

        return pendingResponses;
    }

    public MenteeFeedback buildAndSaveMenteeFeedback(MenteeFeedbackRequest menteeFeedbackRequest, Long memberId) {
        MenteeFeedbackId menteeFeedbackId = new MenteeFeedbackId(menteeFeedbackRequest.getRespondentId(), memberId);

        return MenteeFeedback.builder()
                .id(menteeFeedbackId)
                .content(menteeFeedbackRequest.getContent())
                .build();
    }
}
