package com.ssafy.foss.company.service;

import com.ssafy.foss.company.domain.Company;
import com.ssafy.foss.company.dto.CompanyResponse;
import com.ssafy.foss.company.repository.CompanyRepository;
import com.ssafy.foss.company.utils.HangulUtils;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class CompanyService {
    private final CompanyRepository companyRepository;

    public Company findById(Long id) {
        return companyRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("No company"));
    }

    public List<CompanyResponse> findAllBySearchWord(String searchWord) {
        List<CompanyResponse> companyResponses = companyRepository.findAllBySearchWord(searchWord);
        if (companyResponses == null || companyResponses.isEmpty()) {
            companyResponses = companyRepository.findAllBySearchWord(HangulUtils.extractInitials(searchWord));
        }

        return companyResponses;
    }
}
