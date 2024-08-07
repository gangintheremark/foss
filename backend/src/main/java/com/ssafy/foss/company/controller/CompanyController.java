package com.ssafy.foss.company.controller;

import com.ssafy.foss.company.dto.CompanyResponse;
import com.ssafy.foss.company.service.CompanyService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@Tag(name = "CompanyController", description = "회사 API")
@RequestMapping("/companies")
@RestController
@RequiredArgsConstructor
public class CompanyController {
    private final CompanyService companyService;

//    @Operation(summary = "회사명 검색", description = "키워드로 회사명을 찾을 수 있습니다.")
//    @GetMapping
//    public ResponseEntity<List<CompanyResponse>> findAllByWord(@RequestParam String searchWord) {
//        return ResponseEntity.ok(companyService.findAllBySearchWord(searchWord));
//    }

    @Operation(summary = "모든 회사 정보 조회", description = "모든 회사의 식별자, 회사명을 조회합니다.")
    @GetMapping
    public ResponseEntity<List<CompanyResponse>> findAll() {
        return ResponseEntity.ok(companyService.findAll());
    }

}
