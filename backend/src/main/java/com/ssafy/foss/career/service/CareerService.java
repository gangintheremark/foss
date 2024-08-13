package com.ssafy.foss.career.service;

import com.ssafy.foss.career.domain.Career;
import com.ssafy.foss.career.dto.AddCareerRequest;
import com.ssafy.foss.career.dto.CareerResponse;
import com.ssafy.foss.career.repository.CareerRepository;
import com.ssafy.foss.company.domain.Company;
import com.ssafy.foss.company.service.CompanyService;
import com.ssafy.foss.mentorInfo.domain.MentorInfo;
import com.ssafy.foss.mentorInfo.service.MentorInfoService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Transactional(readOnly = true)
@RequiredArgsConstructor
@Service
public class CareerService {
    private final CareerRepository careerRepository;
    private final MentorInfoService mentorInfoService;
    private final CompanyService companyService;

    @Transactional
    public List<CareerResponse> createOrUpdateCareers(Long memberId, List<AddCareerRequest> addCareerRequests) {
        MentorInfo mentorInfo = mentorInfoService.findMentorInfo(memberId);

        // 기존의 경력 정보를 모두 삭제합니다.
        careerRepository.deleteAllByMentorInfoId(mentorInfo.getId());

        // 새로운 경력 정보 생성
        List<Career> careers = addCareerRequests.stream()
                .map(careerRequest -> {
                    Company company = companyService.findById(careerRequest.getCompanyId());
                    return mapToCareer(mentorInfo, company, careerRequest);
                })
                .collect(Collectors.toList());

        // 새로운 경력 정보 저장
        careers = careerRepository.saveAll(careers);

        // CareerResponse로 변환하여 반환합니다.
        return careers.stream()
                .map(this::mapToCareerResponse)
                .collect(Collectors.toList());
    }


    public List<CareerResponse> findAllCareers(Long memberId) {
        MentorInfo mentorInfo = mentorInfoService.findMentorInfo(memberId);
        List<Career> careers = careerRepository.findAllByMentorInfoIdOrderByStartedDateAsc(mentorInfo.getId());

        return careers.stream()
                .map(this::mapToCareerResponse)
                .collect(Collectors.toList());
    }

    @Transactional
    public List<CareerResponse> updateCareer(Long memberId, List<AddCareerRequest> addCareerRequests) {
        MentorInfo mentorInfo = mentorInfoService.findMentorInfo(memberId);

        deleteCareerByMentorId(memberId);
        careerRepository.flush();

        List<Career> careers = addCareerRequests.stream()
                .map(career -> {
                    Company company = companyService.findById(career.getCompanyId());
                    return mapToCareer(mentorInfo, company, career);
                })
                .collect(Collectors.toList());
        careers = careerRepository.saveAll(careers);

        return careers.stream()
                .map(this::mapToCareerResponse)
                .collect(Collectors.toList());
    }

    @Transactional
    public void deleteCareerByMentorId(Long memberId) {
        MentorInfo mentorInfo = mentorInfoService.findMentorInfo(memberId);
        careerRepository.deleteAllByMentorInfoId(mentorInfo.getId());
    }

    private Career mapToCareer(MentorInfo mentorInfo, Company company, AddCareerRequest addCareerRequest) {
        return Career.builder()
                .mentorInfo(mentorInfo)
                .company(company)
                .department(addCareerRequest.getDepartment())
                .startedDate(addCareerRequest.getStartedDate())
                .endedDate(addCareerRequest.getEndedDate()).build();
    }

    private CareerResponse mapToCareerResponse(Career career) {
        String startedDateStr = formatDate(career.getStartedDate());
        String endedDateStr = career.getEndedDate() != null ? formatDate(career.getEndedDate()) : "재직중";

        return CareerResponse.builder()
                .companyName(career.getCompany().getName())
                .department(career.getDepartment())
                .startedDate(startedDateStr)
                .endedDate(endedDateStr)
                .build();
    }

    private String formatDate(LocalDateTime date) {
        return String.format("%d.%02d", date.getYear(), date.getMonthValue());
    }
}

