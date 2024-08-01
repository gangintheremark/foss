package com.ssafy.foss.respondent.repository;

import com.ssafy.foss.feedback.dto.response.FeedbackDetailResponse;
import com.ssafy.foss.feedback.dto.response.FeedbackListResponse;
import com.ssafy.foss.feedback.dto.response.FeedbackMenteeInfoResponse;
import com.ssafy.foss.respondent.domain.Respondent;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RespondentRepository extends JpaRepository<Respondent, Long> {
    List<Respondent> findAllByInterviewId(Long interviewId);

    @Query("SELECT new com.ssafy.foss.interview.domain.dto.FeedbackMenteeInfoResponse(r.id, m.name) " +
            "FROM Respondent r " +
            "JOIN r.member m " +
            "WHERE r.interview.id = :interviewId AND r.member.id != :memberId")
    List<FeedbackMenteeInfoResponse> findOtherRespondents(@Param("interviewId") Long interviewId, @Param("memberId") Long memberId);

    @Query("SELECT new com.ssafy.foss.feedback.dto.response.FeedbackListResponse(r.id, i.startedDate, " +
            "new com.ssafy.foss.feedback.dto.response.FeedbackMentorInfoResponse(m.id, m.name, c.name, mi.department, m.profileImg, c.logoImg)) " +
            "FROM Respondent r " +
            "JOIN r.interview i " +
            "JOIN i.member m " +
            "JOIN MentorInfo mi ON mi.member.id = m.id " +
            "JOIN Company c ON mi.company.id = c.id " +
            "WHERE r.member.id = :memberId " +
            "AND i.status = com.ssafy.foss.interview.domain.Status.END")
    List<FeedbackListResponse> findFeedbackListByMenteeId(@Param("memberId") Long memberId);

    @Query("SELECT new com.ssafy.foss.feedback.dto.response.FeedbackDetailResponse(r.id, " +
            "ARRAY(mf.goodPoint, mf.badPoint, mf.summary), " +
            "ARRAY(af.goodPoint, af.badPoint, af.summary), " +
            "collect(new com.ssafy.foss.feedback.dto.response.MenteeFeedbackResponse(mf.id.menteeId, mf.content, mf.isEvaluated)), " +
            "ic.content) " +
            "FROM Respondent r " +
            "LEFT JOIN MentorFeedback mf ON r.id = mf.respondentId " +
            "LEFT JOIN AIFeedback af ON r.id = af.respondentId " +
            "LEFT JOIN MenteeFeedback mf ON r.id = mf.id.respondentId " +
            "LEFT JOIN InterviewContent ic ON r.id = ic.respondentId " +
            "WHERE r.id = :respondentId")
    FeedbackDetailResponse findFeedbackDetailByFeedbackId(@Param("respondentId") Long respondentId);
}
