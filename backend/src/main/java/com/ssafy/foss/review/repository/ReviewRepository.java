package com.ssafy.foss.review.repository;

import com.ssafy.foss.member.domain.Member;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ReviewRepository extends JpaRepository<Member, Long> {

}
