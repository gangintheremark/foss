package com.ssafy.foss.career.repository;

import com.ssafy.foss.career.domain.Career;
import com.ssafy.foss.mentorInfo.domain.MentorInfo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CareerRepository extends JpaRepository<Career, Long> {
    List<Career> findAllByMentorInfoIdOrderByStartedDateAsc(Long mentorInfoId);

    void deleteAllByMentorInfoId(Long mentorInfoId);
}
