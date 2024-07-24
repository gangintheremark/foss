package com.ssafy.foss.company.controller;

import com.ssafy.foss.company.dto.CompanyResponse;
import com.ssafy.foss.company.service.CompanyService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RequestMapping("/companys")
@RestController
@RequiredArgsConstructor
public class CompanyController {
    private final CompanyService companyService;

    @GetMapping
    public ResponseEntity<List<CompanyResponse>> findAllByWord(@RequestParam String searchWord) {
        return ResponseEntity.ok(companyService.findAllBySearchWord(searchWord));
    }

}
