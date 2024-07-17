package com.ssafy.foss.career.repository;

import com.ssafy.foss.career.domain.Career;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CareerRepository extends JpaRepository<Career, Long> {
    List<Career> findAllByMentorIdOrderByStartedDateAsc(Long mentorId);

    void deleteAllByMentorId(Long mentorId);
}
