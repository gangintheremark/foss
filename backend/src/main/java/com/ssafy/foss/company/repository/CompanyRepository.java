package com.ssafy.foss.company.repository;

import com.ssafy.foss.company.domain.Company;
import com.ssafy.foss.company.dto.CompanyResponse;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CompanyRepository extends JpaRepository<Company, Long> {
    @Query("SELECT new com.ssafy.foss.company.dto.CompanyResponse(c.id, c.name, c.logoImg) " +
            "FROM Company c " +
            "WHERE (LOWER(c.name) LIKE %:searchWord% " +
            "OR LOWER(c.initials) LIKE %:searchWord%)")
    List<CompanyResponse> findAllBySearchWord(@Param("searchWord") String searchWord);
}
