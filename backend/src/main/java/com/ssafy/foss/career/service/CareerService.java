package com.ssafy.foss.career.service;

import com.ssafy.foss.career.domain.Career;
import com.ssafy.foss.career.dto.AddCareerRequest;
import com.ssafy.foss.career.dto.CareerResponse;
import com.ssafy.foss.career.repository.CareerRepository;
import com.ssafy.foss.company.domain.Company;
import com.ssafy.foss.company.service.CompanyService;
import com.ssafy.foss.member.domain.Member;
import com.ssafy.foss.mentorInfo.domain.MentorInfo;
import com.ssafy.foss.mentorInfo.dto.CreateMentorInfoAndCareerRequest;
import com.ssafy.foss.mentorInfo.service.MentorInfoService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

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
    public void createCareers(Long memberId, CreateMentorInfoAndCareerRequest createMentorInfoAndCareerRequest, MultipartFile file) {
        MentorInfo mentorInfo =  mentorInfoService.createMentorInfo(memberId ,createMentorInfoAndCareerRequest.getSelfProduce(), file);
        List<AddCareerRequest> addCareerRequests = createMentorInfoAndCareerRequest.getAddCareerRequests();
        System.out.println(addCareerRequests + " ##############");
        List<Career> careers = addCareerRequests.stream()
                .map(career -> {
                    Company company = companyService.findById(career.getCompanyId());
                    return mapToCareer(mentorInfo, company, career);
                })
                .collect(Collectors.toList());
        careers = careerRepository.saveAll(careers);

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
        LocalDateTime endedDate = career.getEndedDate();
        String endedDateStr = endedDate == null ? "현재" : formatDate(endedDate);

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
