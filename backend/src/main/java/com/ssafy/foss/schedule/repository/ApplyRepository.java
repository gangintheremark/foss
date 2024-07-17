package com.ssafy.foss.schedule.repository;

import com.ssafy.foss.schedule.domain.Apply;
import com.ssafy.foss.schedule.domain.ApplyId;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ApplyRepository extends JpaRepository<Apply, ApplyId> {
}
