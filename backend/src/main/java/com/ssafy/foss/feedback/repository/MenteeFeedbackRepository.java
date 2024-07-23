package com.ssafy.foss.feedback.repository;

import com.ssafy.foss.feedback.domain.MenteeFeedback;
import com.ssafy.foss.feedback.domain.MenteeFeedbackId;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MenteeFeedbackRepository extends JpaRepository<MenteeFeedback, MenteeFeedbackId> {

    @Query("SELECT mf FROM MenteeFeedback mf WHERE mf.id.scheduleId = :scheduleId AND mf.id.memberId = :memberId")
    List<MenteeFeedback> findByScheduleIdAndMemberId(@Param("scheduleId") Long scheduleId, @Param("memberId") Long memberId);
}
