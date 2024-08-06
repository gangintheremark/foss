package com.ssafy.foss.feedback.service;

import com.ssafy.foss.feedback.domain.MenteeFeedback;
import com.ssafy.foss.feedback.domain.MenteeFeedbackId;
import com.ssafy.foss.feedback.domain.MentorFeedback;
import com.ssafy.foss.feedback.dto.request.*;
import com.ssafy.foss.feedback.dto.response.*;
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

import java.time.format.DateTimeFormatter;
import java.util.Iterator;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import java.util.stream.Collectors;

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
        MentorFeedback mentorFeedback = mentorFeedbackRepository.findById(respondentId).orElseThrow();
        String[] mentorFeedbackArray = mentorFeedback.isCompleted() ? new String[]{mentorFeedback.getGoodPoint(), mentorFeedback.getBadPoint(), mentorFeedback.getSummary()} : new String[]{"","",""};

        List<MenteeFeedback> menteeFeedbacks = menteeFeedbackRepository.findAllMenteeFeedbackByRespondentId(respondentId);

        MenteeFeedbackResponse[] menteeFeedbacksArray = new MenteeFeedbackResponse[menteeFeedbacks.size()];

        for (int index = 0; index < menteeFeedbacks.size(); index++) {
            MenteeFeedback menteeFeedback = menteeFeedbacks.get(index);
            menteeFeedbacksArray[index] = new MenteeFeedbackResponse(menteeFeedback.getId().getMenteeId(), menteeFeedback.getContent(), menteeFeedback.getIsEvaluated());
        }

        return new FeedbackDetailResponse(respondentId, mentorFeedbackArray, menteeFeedbacksArray);
    }

    //TODO : 이거 야매로 만든 상황이라 나중에 join query로 만들던가 interview 컬럼에 추가해야할듯.
    // (멘토) 작성가능한 피드백 리스트 조회
    @Override
    public List<MentorFeedbackPendingResponse> findPendingMentorFeedback(Long mentorId) {
        List<MentorFeedbackPendingResponse> pendingResponses = interviewRepository.findPendingMentorFeedback(mentorId);

        pendingResponses.removeIf(response -> {
            List<FeedbackMenteeInfoResponse> menteeInfos = respondentRepository.findAllRespondentsByInterviewId(response.getInterviewId());
            response.setMenteeInfos(menteeInfos);

            return menteeInfos.stream()
                    .map(menteeInfo -> respondentRepository.findIdByInterviewIdAndMemberId(response.getInterviewId(), menteeInfo.getMenteeId()).orElse(null))
                    .filter(Objects::nonNull)
                    .noneMatch(respondentId -> mentorFeedbackRepository.findByRespondentIdAndIsCompletedFalse(respondentId).isPresent());
        });

        return pendingResponses;
    }

    // (멘토) 작성가능한 피드백 상세 조회
    @Override
    public MentorFeedbackPendingDetailResponse findPendingMentorFeedbackDetail(Long interviewId) {
        MentorFeedbackPendingDetailResponse interviewDetail = interviewRepository.findInterviewDetailById(interviewId);

        if (interviewDetail == null) throw new EntityNotFoundException("인터뷰를 찾을 수 없습니다. ID: " + interviewId);

        // 인터뷰와 관련된 mentee 정보 리스트 가져오기
        List<MentorFeedbackPendingMenteeInfoResponse> menteeInfos = respondentRepository.findMenteeInfosByInterviewId(interviewId);
        // menteeInfos를 인터뷰 상세 응답에 설정
        interviewDetail.setMenteeInfos(menteeInfos);

        return interviewDetail;
    }

    @Override
    @Transactional
    public void createMentorFeedback(InterviewMentorFeedbackRequest interviewMentorFeedback) {
        Long interviewId = interviewMentorFeedback.getInterviewId();
        List<MentorFeedbackRequest> feedbacks = interviewMentorFeedback.getFeedbacks();

        System.out.println("Received interviewId: " + interviewId);
        feedbacks.forEach(feedback -> {
            System.out.println("Processing feedback for menteeId: " + feedback.getMenteeId());
            System.out.println("Good Point: " + feedback.getGoodPoint());
            System.out.println("Bad Point: " + feedback.getBadPoint());
            System.out.println("Summary: " + feedback.getSummary());
        });

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
                .isEvaluated(false)
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
