package com.ssafy.foss.feedback.repository;

import com.ssafy.foss.feedback.domain.MenteeFeedback;
import com.ssafy.foss.feedback.domain.MenteeFeedbackId;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MenteeFeedbackRepository extends JpaRepository<MenteeFeedback, MenteeFeedbackId> {
}
