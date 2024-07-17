package com.ssafy.foss.review.repository;

import com.ssafy.foss.review.domain.Review;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ReviewRepository extends JpaRepository<Review, Long> {
    Optional<List<Review>> findAllByMentorId(Long mentorId);

    Optional<List<Review>> findAllByMemberId(Long memberId);
}
