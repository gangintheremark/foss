package com.ssafy.foss.mentorInfo.repository;

import com.ssafy.foss.mentorInfo.domain.MentorInfo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface MentorInfoRepository extends JpaRepository<MentorInfo, Long> {
    Optional<MentorInfo> findByMemberId(Long memberId);
}
