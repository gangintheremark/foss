package com.ssafy.foss.feedback.service;

import com.ssafy.foss.feedback.domain.MenteeFeedback;
import com.ssafy.foss.feedback.domain.MenteeFeedbackId;
import com.ssafy.foss.feedback.domain.MentorFeedback;
import com.ssafy.foss.feedback.dto.request.*;
import com.ssafy.foss.feedback.dto.response.FeedbackDetailResponse;
import com.ssafy.foss.feedback.dto.response.FeedbackListResponse;
import com.ssafy.foss.feedback.dto.response.FeedbackMenteeInfoResponse;
import com.ssafy.foss.feedback.dto.response.MentorFeedbackPendingResponse;
import com.ssafy.foss.feedback.repository.MenteeFeedbackRepository;
import com.ssafy.foss.feedback.repository.MentorFeedbackRepository;
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
    private final MentorFeedbackRepository mentorFeedbackRepository;
    private final MemberRepository memberRepository;

    // 멘티 피드백 작성
    @Override
    @Transactional
    public void createMenteeFeedback(InterviewMenteeFeedbackRequest interviewMenteeFeedbackRequest, Long memberId) {
        for (MenteeFeedbackRequest menteeFeedbackRequest : interviewMenteeFeedbackRequest.getMenteeFeedbacks()) {
            Long respondentId = respondentRepository.findIdByInterviewIdAndMemberId(interviewMenteeFeedbackRequest.getInterviewId(), menteeFeedbackRequest.getMenteeId()).orElseThrow();
            menteeFeedbackRepository.save(buildMenteeFeedback(menteeFeedbackRequest, respondentId, memberId));
        }
    }

    // 멘티 피드백 평가
    @Override
    @Transactional
    public void updateMenteeEvaluate(FeedbackRatingRequest feedbackRatingRequest) {
        MenteeFeedbackId menteeFeedbackId = new MenteeFeedbackId(feedbackRatingRequest.getRespondentId(), feedbackRatingRequest.getMenteeId());
        MenteeFeedback menteeFeedback = menteeFeedbackRepository.findById(menteeFeedbackId).orElseThrow();
        menteeFeedback.updateConfirmEvaluated();

        Member member = memberRepository.findById(feedbackRatingRequest.getMenteeId())
                .orElseThrow(() -> new EntityNotFoundException("Member not found"));
        member.adjustTemperature(feedbackRatingRequest.getRating());
    }

    // (멘티) 내 피드백 리스트 조회
    @Override
    public List<FeedbackListResponse> findFeedbackListByMenteeId(Long memberId) {
        return respondentRepository.findFeedbackListByMenteeId(memberId);
    }

    // (멘티) 내 피드백 상세 조회
    @Override
    public FeedbackDetailResponse findFeedbackDetailByFeedbackId(Long respondentId) {
        return respondentRepository.findFeedbackDetailByFeedbackId(respondentId);
    }

    // (멘토) 작성가능한 피드백 리스트 조회
    @Override
    public List<MentorFeedbackPendingResponse> findPendingMentorFeedback(Long mentorId) {
        List<MentorFeedbackPendingResponse> pendingResponses = interviewRepository.findPendingMentorFeedback(mentorId);

        for (MentorFeedbackPendingResponse response : pendingResponses) {
            List<FeedbackMenteeInfoResponse> menteeInfos = respondentRepository.findAllRespondentsByInterviewId(response.getInterviewId());
            response.setMenteeInfos(menteeInfos);
        }

        return pendingResponses;
    }


    @Override
    @Transactional
    public void createMentorFeedback(InterviewMentorFeedbackRequest interviewMentorFeedback) {
        Long interviewId = interviewMentorFeedback.getInterviewId();
        List<MentorFeedbackRequest> feedbacks = interviewMentorFeedback.getFeedbacks();

        for (MentorFeedbackRequest feedback : feedbacks) {
            Long respondentId = respondentRepository.findIdByInterviewIdAndMemberId(interviewId, feedback.getMenteeId()).orElseThrow();
            mentorFeedbackRepository.save(buildMentorFeedback(feedback, respondentId));
        }
    }

    @Override
    @Transactional
    public void updateMentorFeedback(InterviewMentorFeedbackRequest interviewMentorFeedback) {
        Long interviewId = interviewMentorFeedback.getInterviewId();
        List<MentorFeedbackRequest> feedbacks = interviewMentorFeedback.getFeedbacks();

        for (MentorFeedbackRequest feedback : feedbacks) {
            Long respondentId = respondentRepository.findIdByInterviewIdAndMemberId(interviewId, feedback.getMenteeId()).orElseThrow();
            MentorFeedback mentorFeedback = mentorFeedbackRepository.findById(respondentId).orElseThrow();

            mentorFeedback.change(feedback.getGoodPoint(), feedback.getBadPoint(), feedback.getSummary());
        }
    }

    private MenteeFeedback buildMenteeFeedback(MenteeFeedbackRequest menteeFeedbackRequest, Long respondentId, Long memberId) {
        MenteeFeedbackId menteeFeedbackId = new MenteeFeedbackId(respondentId, memberId);

        return MenteeFeedback.builder()
                .id(menteeFeedbackId)
                .content(menteeFeedbackRequest.getContent())
                .build();
    }

    private MentorFeedback buildMentorFeedback(MentorFeedbackRequest mentorFeedbackRequest, Long respondentId) {
        return MentorFeedback.builder()
                .respondentId(respondentId)
                .goodPoint(mentorFeedbackRequest.getGoodPoint())
                .badPoint(mentorFeedbackRequest.getBadPoint())
                .summary(mentorFeedbackRequest.getSummary())
                .isCompleted(false).build();
    }

}
