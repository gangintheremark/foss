package com.ssafy.foss.interview.repository;

import com.ssafy.foss.feedback.dto.response.MentorFeedbackPendingDetailResponse;
import com.ssafy.foss.feedback.dto.response.MentorFeedbackPendingResponse;
import com.ssafy.foss.interview.domain.Interview;
import com.ssafy.foss.interview.domain.Status;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Repository
public interface InterviewRepository extends JpaRepository<Interview, Long> {
    List<Interview> findAllByMemberIdAndStatusNot(Long memberId, Status status);

    @Query("SELECT i " +
            "FROM Interview i join Respondent r on (i.id = r.interview.id) " +
            "WHERE r.member.id = :menteeId " +
            "and i.status != 'wait'")
    List<Interview> findAllByMenteeId(Long menteeId);

    List<Interview> findAllByMemberIdAndStatusNotAndStartedDateBetween(Long memberId, Status status, LocalDateTime start, LocalDateTime end);

    Optional<Interview> findByMemberIdAndStartedDate(Long memberId, LocalDateTime startedDate);

    @Query("SELECT new com.ssafy.foss.feedback.dto.response.MentorFeedbackPendingResponse(i.id, i.startedDate) " +
            "FROM Interview i " +
            "WHERE i.member.id = :mentorId " +
            "AND i.status = com.ssafy.foss.interview.domain.Status.END " +
            "AND NOT EXISTS (SELECT 1 FROM Respondent r WHERE r.interview.id = i.id " +
            "AND r.id NOT IN (SELECT mf.respondentId FROM MentorFeedback mf WHERE mf.respondentId = r.id))")
    List<MentorFeedbackPendingResponse> findPendingMentorFeedback(@Param("mentorId") Long mentorId);

    @Query("SELECT new com.ssafy.foss.feedback.dto.response.MentorFeedbackPendingDetailResponse(" +
            "i.id, i.startedDate) " +
            "FROM Interview i " +
            "WHERE i.id = :interviewId")
    MentorFeedbackPendingDetailResponse findInterviewDetailById(@Param("interviewId") Long interviewId);

    Integer countByMemberId(Long mentorId);
}
