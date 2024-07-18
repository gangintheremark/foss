package com.ssafy.foss.career.controller;

import com.ssafy.foss.career.domain.Career;
import com.ssafy.foss.career.dto.AddCareerRequest;
import com.ssafy.foss.career.dto.CareerResponse;
import com.ssafy.foss.career.service.CareerService;
import com.ssafy.foss.member.domain.PrincipalDetail;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequestMapping("/careers")
@RestController
@RequiredArgsConstructor
public class CareerController {
    private final CareerService careerService;

    @PostMapping
    public ResponseEntity<List<Career>> createCareers(@RequestBody List<AddCareerRequest> addCareerRequests, @AuthenticationPrincipal PrincipalDetail principalDetail) {
        return ResponseEntity.ok(careerService.createCareers(principalDetail.getId(), addCareerRequests));
    }

    @GetMapping
    public ResponseEntity<List<CareerResponse>> findAllCareers(@AuthenticationPrincipal PrincipalDetail principalDetail) {
        return ResponseEntity.ok(careerService.findAllCareers(principalDetail.getId()));
    }

    @PutMapping
    public ResponseEntity<List<Career>> updateCareers(@RequestBody List<AddCareerRequest> addCareerRequests, @AuthenticationPrincipal PrincipalDetail principalDetail) {
        return ResponseEntity.ok(careerService.updateCareer(principalDetail.getId(), addCareerRequests));
    }

}
