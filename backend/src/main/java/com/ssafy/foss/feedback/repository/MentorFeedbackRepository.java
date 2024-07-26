package com.ssafy.foss.feedback.repository;

import com.ssafy.foss.feedback.domain.MentorFeedback;
import com.ssafy.foss.feedback.domain.MentorFeedbackId;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MentorFeedbackRepository extends JpaRepository<MentorFeedback, MentorFeedbackId> {
}
