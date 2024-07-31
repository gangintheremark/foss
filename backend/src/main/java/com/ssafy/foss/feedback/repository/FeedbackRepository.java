package com.ssafy.foss.feedback.repository;

import com.ssafy.foss.feedback.dto.response.FeedbackListResponse;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface FeedbackRepository extends JpaRepository<MenteeFeedback, MenteeFeedbackId> {

    @Query("SELECT new com.ssafy.foss.review.dto.response.FeedbackListResponse(r.member.id, i.startedDate, r.isCompleted, " +
            "new com.ssafy.foss.review.dto.response.FeedbackListResponse.MentorInfo(m.id, m.name, c.name, cr.department, m.profileImg, c.logoImg)) " +
            "FROM Respondent r " +
            "JOIN r.interview i " +
            "JOIN i.member m " +
            "JOIN MentorInfo mi ON m.id = mi.member.id " +
            "JOIN Career cr ON mi.id = cr.mentorInfo.id " +
            "JOIN Company c ON cr.company.id = c.id " +
            "WHERE r.member.id = :menteeId " +
            "AND i.status = 'END' " +
            "AND cr.startedDate = (SELECT MAX(cr2.startedDate) FROM Career cr2 WHERE cr2.mentorInfo.id = mi.id)")
    List<FeedbackListResponse> findFeedbackListResponsesByMenteeId(@Param("menteeId") Long menteeId);
}
