package com.ssafy.foss.member.repository;

import com.ssafy.foss.member.domain.Member;
import com.ssafy.foss.member.dto.MentorResponse;
import io.lettuce.core.dynamic.annotation.Param;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface MemberRepository extends JpaRepository<Member, Long> {
    Optional<Member> findBySocialId(String socialId);

    Optional<Member> findByEmail(String email);

    @Query("SELECT new com.ssafy.foss.member.dto.MentorResponse(m.name, m.profileImg, mi.selfProduce, cp.name, cp.logoImg, c.department, mi.fileUrl)" +
            "FROM Member m " +
            "JOIN MentorInfo mi ON (m.id = mi.member.id) " +
            "JOIN Career c ON (mi.id = c.mentorInfo.id) " +
            "JOIN Company cp ON (cp.id = c.company.id) " +
            "WHERE m.id = :id " +
            "ORDER BY c.startedDate DESC " +
            "LIMIT 1")
    List<MentorResponse> findMentorResponseById(@Param("id") Long id, Pageable pageable);
}
