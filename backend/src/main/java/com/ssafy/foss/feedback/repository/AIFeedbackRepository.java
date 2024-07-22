package com.ssafy.foss.feedback.repository;

import com.ssafy.foss.feedback.domain.AIFeedback;
import com.ssafy.foss.feedback.domain.AIFeedbackId;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AIFeedbackRepository extends JpaRepository<AIFeedback, AIFeedbackId> {
}
