package com.ssafy.foss.interview.repository;

import com.ssafy.foss.interview.domain.Interview;
import com.ssafy.foss.interview.domain.Status;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
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
            "and i.status != 'wait'"
    )
    List<Interview> findAllByMenteeId(Long menteeId);


    List<Interview> findAllByMemberIdAndStatusNotAndStartedDateBetween(Long memberId, Status status, LocalDateTime start, LocalDateTime end);

    Optional<Interview> findByMemberIdAndStartedDate(Long memberId, LocalDateTime startedDate);

    Integer countByMemberId(Long mentorId);
}
