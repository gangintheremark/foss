package com.ssafy.foss.feedback.service;

import com.ssafy.foss.feedback.domain.AIFeedback;
import com.ssafy.foss.feedback.domain.MentorFeedback;
import com.ssafy.foss.feedback.dto.request.*;
import com.ssafy.foss.feedback.dto.response.*;
import com.ssafy.foss.interview.repository.InterviewRepository;
import com.ssafy.foss.respondent.repository.RespondentRepository;
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
}
