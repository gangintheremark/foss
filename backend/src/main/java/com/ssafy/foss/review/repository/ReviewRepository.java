package com.ssafy.foss.review.repository;

import com.ssafy.foss.review.domain.Review;
import com.ssafy.foss.review.dto.response.ReviewInfoResponse;
import com.ssafy.foss.review.dto.response.ReviewResponse;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ReviewRepository extends JpaRepository<Review, Long> {
    Optional<List<Review>> findAllByMentorId(Long mentorId);

    Optional<List<Review>> findAllByMemberId(Long memberId);

    @Query("SELECT new com.ssafy.foss.review.dto.response.ReviewInfoResponse(m.name, r.rating, r.content, r.createdDate) " +
            "FROM Review r JOIN r.member m WHERE r.mentor.id = :mentorId")
    List<ReviewInfoResponse> findReviewInfoResponsesByMentorId(@Param("mentorId") Long mentorId);

    @Query("SELECT new com.ssafy.foss.review.dto.response.ReviewResponse(" +
            "new com.ssafy.foss.review.dto.response.ReviewInfoResponse(m.name, r.rating, r.content, r.createdDate), " +
            "new com.ssafy.foss.review.dto.response.ReviewMentorInfoResponse(mentor.id, mentor.name, mi.companyName, mi.department, mentor.profileImg)) " +
            "FROM Review r " +
            "JOIN r.member m " +
            "JOIN r.mentor mentor " +
            "JOIN MentorInfo mi ON mentor.id = mi.member.id " +
            "WHERE m.id = :memberId")
    List<ReviewResponse> findReviewResponsesByMemberId(@Param("memberId") Long memberId);


    @Query("SELECT new com.ssafy.foss.review.dto.response.ReviewResponse(" +
            "new com.ssafy.foss.review.dto.response.ReviewInfoResponse(m.name, r.rating, r.content, r.createdDate), " +
            "new com.ssafy.foss.review.dto.response.ReviewMentorInfoResponse(mentor.id, mentor.name, mi.selfProduce, c.company.name, c.department, c.company.logoImg)) " +
            "FROM Review r " +
            "JOIN r.member m " +
            "JOIN r.mentor mentor " +
            "JOIN MentorInfo mi ON mentor.id = mi.member.id " +
            "JOIN Career c ON mi.id = c.mentorInfo.id " +
            "JOIN Company co ON c.company.id = co.id")
    List<ReviewResponse> findAllReviewResponses();
}
