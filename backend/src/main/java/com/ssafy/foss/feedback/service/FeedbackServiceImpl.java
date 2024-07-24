package com.ssafy.foss.feedback.service;

import com.ssafy.foss.feedback.domain.*;
import com.ssafy.foss.feedback.dto.request.MenteeFeedbackRequest;
import com.ssafy.foss.feedback.dto.request.MentorFeedbackRequest;
import com.ssafy.foss.feedback.dto.response.FeedbackDetailResponse;
import com.ssafy.foss.feedback.dto.response.MenteeFeedbackResponse;
import com.ssafy.foss.feedback.repository.AIFeedbackRepository;
import com.ssafy.foss.feedback.repository.MenteeFeedbackRepository;
import com.ssafy.foss.feedback.repository.MentorFeedbackRepository;
import com.ssafy.foss.member.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@Service
@Transactional(readOnly = true)
public class FeedbackServiceImpl implements FeedbackService {
    private final MentorFeedbackRepository mentorFeedbackRepository;
    private final MenteeFeedbackRepository menteeFeedbackRepository;
    private final AIFeedbackRepository aiFeedbackRepository;
    private final MemberRepository memberRepositoryRepository;

    @Override
    public FeedbackDetailResponse findFeedbackDetailByFeedbackId(Long scheduleId, Long memberId) {
        MentorFeedbackId mentorFeedbackId = new MentorFeedbackId(scheduleId, memberId);
        AIFeedbackId aiFeedbackId = new AIFeedbackId(scheduleId, memberId);

        String[] mentorFeedback = getMentorFeedbackPoints(mentorFeedbackId);
        String[] aiFeedback = getAIFeedbackPoints(aiFeedbackId);
        List<MenteeFeedbackResponse> menteeFeedback = getMenteeFeedbackResponses(scheduleId, memberId);

        return new FeedbackDetailResponse(scheduleId, mentorFeedback, menteeFeedback, aiFeedback);
    }

    @Override
    @Transactional
    public MenteeFeedback createMenteeFeedback(MenteeFeedbackRequest menteeFeedbackRequest, Long menteeId) {
        return menteeFeedbackRepository.save(buildMenteeFeedback(menteeFeedbackRequest, menteeId));
    }

    @Override
    public MentorFeedback createMentorFeedback(MentorFeedbackRequest mentorFeedbackRequest) {
        return buildMentorFeedback(mentorFeedbackRequest);
    }

    private MentorFeedback buildMentorFeedback(MentorFeedbackRequest mentorFeedbackRequest) {
        MentorFeedbackId mentorFeedbackId = new MentorFeedbackId(mentorFeedbackRequest.getScheduleId(), mentorFeedbackRequest.getMemberId());

        return MentorFeedback.builder()
                .id(mentorFeedbackId)
                .goodPoint(mentorFeedbackRequest.getGoodPoint())
                .badPoint(mentorFeedbackRequest.getBadPoint())
                .summary(mentorFeedbackRequest.getSummary())
                .build();
    }

    private MenteeFeedback buildMenteeFeedback(MenteeFeedbackRequest menteeFeedbackRequest, Long menteeId) {
        MenteeFeedbackId menteeFeedbackId = new MenteeFeedbackId(menteeFeedbackRequest.getScheduleId(), menteeFeedbackRequest.getMemberId(), menteeId);

        return MenteeFeedback.builder()
                .id(menteeFeedbackId)
                .content(menteeFeedbackRequest.getContent())
                .isEvaluated(false)
                .build();
    }

    private String[] getMentorFeedbackPoints(MentorFeedbackId id) {
        MentorFeedback feedback = mentorFeedbackRepository.findById(id).orElseThrow(() -> new RuntimeException("Feedback not found"));
        return new String[]{feedback.getGoodPoint(), feedback.getBadPoint(), feedback.getSummary()};
    }

    private String[] getAIFeedbackPoints(AIFeedbackId id) {
        AIFeedback feedback = aiFeedbackRepository.findById(id).orElseThrow(() -> new RuntimeException("Feedback not found"));
        return new String[]{feedback.getGoodPoint(), feedback.getBadPoint(), feedback.getSummary()};
    }

    private List<MenteeFeedbackResponse> getMenteeFeedbackResponses(Long scheduleId, Long memberId) {
        List<MenteeFeedback> feedbackList = menteeFeedbackRepository.findByScheduleIdAndMemberId(scheduleId, memberId);
        return feedbackList.stream()
                .map(feedback -> new MenteeFeedbackResponse(
                        feedback.getId().getMenteeId(),
                        feedback.getContent(),
                        feedback.getIsEvaluated()
                ))
                .collect(Collectors.toList());
    }

}
