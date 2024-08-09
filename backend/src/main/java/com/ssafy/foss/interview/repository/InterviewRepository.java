package com.ssafy.foss.interview.repository;

import com.ssafy.foss.interview.domain.Interview;
import com.ssafy.foss.interview.domain.Status;
import io.lettuce.core.dynamic.annotation.Param;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Repository
public interface InterviewRepository extends JpaRepository<Interview, Long> {
    List<Interview> findAllByMemberIdAndStatusNotOrderByStartedDate(Long memberId, Status status);

    @Query("SELECT i " +
            "FROM Interview i join Respondent r on (i.id = r.interview.id) " +
            "WHERE r.member.id = :menteeId " +
            "and i.status != 'wait' " +
            "ORDER BY i.startedDate")
    List<Interview> findAllByMenteeIdOrderByStartDateAsc(@Param("menteeId") Long menteeId);

    List<Interview> findAllByMemberIdAndStatusNotAndStartedDateBetweenOrderByStartedDateAsc(Long memberId, Status status, LocalDateTime start, LocalDateTime end);

    Optional<Interview> findByMemberIdAndStartedDate(Long memberId, LocalDateTime startedDate);

    Integer countByMemberId(Long mentorId);

    @Query("SELECT COUNT(i) FROM Interview i WHERE i.member.id = :memberId and i.status = 'END'")
    Integer findCountByMemberId(@Param("memberId") Long memberId);

}
