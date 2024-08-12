package com.ssafy.foss.company.service;

import com.ssafy.foss.company.domain.Company;
import com.ssafy.foss.company.dto.CompanyResponse;
import com.ssafy.foss.company.repository.CompanyRepository;
import lombok.RequiredArgsConstructor;
import org.jetbrains.annotations.NotNull;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class CompanyService {
    private final CompanyRepository companyRepository;

    public Company findById(Long id) {
        return companyRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("No company"));
    }

    public List<CompanyResponse> findAll() {
        List<Company> companies = companyRepository.findAll();
        return mapToCompanyResponse(companies);
    }

    private static @NotNull List<CompanyResponse> mapToCompanyResponse(List<Company> companies) {
        return companies.stream()
                .map(c -> {
                    return CompanyResponse.builder()
                            .id(c.getId())
                            .name(c.getName())
                            .logoImg(c.getLogoImg()).build();
                }).collect(Collectors.toList());
    }
}
