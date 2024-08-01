package com.ssafy.foss.feedback.repository;

import com.ssafy.foss.feedback.domain.MentorFeedback;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MentorFeedbackRepository extends JpaRepository<MentorFeedback, Long> {
}
