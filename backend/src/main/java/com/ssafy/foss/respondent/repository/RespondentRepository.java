package com.ssafy.foss.respondent.repository;

import com.ssafy.foss.feedback.dto.response.FeedbackListResponse;
import com.ssafy.foss.respondent.domain.Respondent;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface RespondentRepository extends JpaRepository<Respondent, Long> {
    List<Respondent> findAllByInterviewId(Long interviewId);

    @Query("SELECT new com.ssafy.foss.feedback.dto.response.FeedbackListResponse(r.id, i.startedDate, " +
            "new com.ssafy.foss.feedback.dto.response.FeedbackMentorInfoResponse(m.id, m.name, c.company.name, c.department, m.profileImg, co.logoImg)) " +
            "FROM Respondent r " +
            "JOIN r.interview i " +
            "JOIN i.member m " +
            "JOIN MentorInfo mi ON mi.member.id = m.id " +
            "JOIN Career c ON mi.id = c.mentorInfo.id " +
            "JOIN Company co ON c.company.id = co.id " +
            "WHERE r.member.id = :memberId " +
            "AND i.status = com.ssafy.foss.interview.domain.Status.END " +
            "AND c.startedDate = (SELECT MAX(c2.startedDate) FROM Career c2 WHERE c2.mentorInfo.id = mi.id)")
    List<FeedbackListResponse> findFeedbackListByMenteeId(@Param("memberId") Long memberId);

    @Query("SELECT r.id FROM Respondent r WHERE r.interview.id = :interviewId AND r.member.id = :memberId")
    Optional<Long> findIdByInterviewIdAndMemberId(@Param("interviewId") Long interviewId, @Param("memberId") Long memberId);

    Respondent findByInterviewIdAndMemberId(Long interviewId, Long memberId);

    void deleteByInterviewId(Long interviewId);
}
