package com.ssafy.foss.respondent.repository;

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
}
