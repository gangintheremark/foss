package com.ssafy.foss.career.controller;

import com.ssafy.foss.career.dto.AddCareerRequest;
import com.ssafy.foss.career.dto.CareerResponse;
import com.ssafy.foss.career.service.CareerService;
import com.ssafy.foss.member.domain.PrincipalDetail;
import com.ssafy.foss.mentorInfo.domain.MentorInfo;
import com.ssafy.foss.mentorInfo.dto.CreateMentorInfoAndCareerRequest;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Tag(name = "CareerController", description = "경력사항 API")
@RequestMapping("/careers")
@RestController
@RequiredArgsConstructor
public class CareerController {
    private final CareerService careerService;

    @Operation(summary = "경력사항 저장", description = "나의 경력사항을 저장합니다.")
    @PostMapping(consumes = {MediaType.APPLICATION_JSON_VALUE, MediaType.MULTIPART_FORM_DATA_VALUE})
    public ResponseEntity<MentorInfo> createMentorInfoAndSchedule(@AuthenticationPrincipal PrincipalDetail principalDetail,
                                                                  @RequestPart CreateMentorInfoAndCareerRequest createMentorInfoAndCareerRequest,
                                                                  @RequestPart(value = "file", required = false) MultipartFile file) {
        careerService.createCareers(principalDetail.getId(), createMentorInfoAndCareerRequest, file);
        return ResponseEntity.ok().build();
    }

    @Operation(summary = "경력사항 조회", description = "나의 경력사항을 조회합니다.")
    @GetMapping
    public ResponseEntity<List<CareerResponse>> findAllCareers(@AuthenticationPrincipal PrincipalDetail principalDetail) {
        return ResponseEntity.ok(careerService.findAllCareers(principalDetail.getId()));
    }

    @Operation(summary = "경력사항 수정", description = "나의 경력사항을 수정합니다.")
    @PutMapping
    public ResponseEntity<List<CareerResponse>> updateCareers(@RequestBody List<AddCareerRequest> addCareerRequests, @AuthenticationPrincipal PrincipalDetail principalDetail) {
        return ResponseEntity.ok(careerService.updateCareer(principalDetail.getId(), addCareerRequests));
    }

    @Operation(summary = "경력사항 삭제", description = "나의 경력사항을 삭제합니다.")
    @DeleteMapping
    public String asd(@AuthenticationPrincipal PrincipalDetail principalDetail) {
        careerService.deleteCareerByMentorId(principalDetail.getId());
        return "das";
    }

}
