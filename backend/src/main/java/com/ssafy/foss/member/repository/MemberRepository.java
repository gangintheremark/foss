package com.ssafy.foss.member.repository;

import com.ssafy.foss.member.domain.Member;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface MemberRepository extends JpaRepository<Member, Long> {
    Optional<Member> findBySocialId(String socialId);

    Optional<Member> findByEmail(String email);
}
