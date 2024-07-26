package com.ssafy.foss.respondent.repository;

import com.ssafy.foss.respondent.domain.Respondent;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RespondentRepository extends JpaRepository<Respondent, Long> {
}
