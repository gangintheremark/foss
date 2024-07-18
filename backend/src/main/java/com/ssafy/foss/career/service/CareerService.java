package com.ssafy.foss.career.service;

import com.ssafy.foss.career.domain.Career;
import com.ssafy.foss.career.dto.AddCareerRequest;
import com.ssafy.foss.career.dto.CareerResponse;
import com.ssafy.foss.career.repository.CareerRepository;
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

    @Transactional
    public List<Career> createCareers(Long memberId, List<AddCareerRequest> addCareerRequests) {
        MentorInfo mentorInfo = mentorInfoService.findMentorInfo(memberId);

        List<Career> careers = addCareerRequests.stream()
                .map(career -> mapToCareer(mentorInfo.getId(), career))
                .collect(Collectors.toList());
        return careerRepository.saveAll(careers);
    }

    public List<CareerResponse> findAllCareers(Long memberId) {
        MentorInfo mentorInfo = mentorInfoService.findMentorInfo(memberId);
        List<Career> careers = careerRepository.findAllByMentorIdOrderByStartedDateAsc(mentorInfo.getId());

        return careers.stream()
                .map(this::mapToCareerResponse)
                .collect(Collectors.toList());
    }

    @Transactional
    public List<Career> updateCareer(Long memberId, List<AddCareerRequest> addCareerRequests) {
        MentorInfo mentorInfo = mentorInfoService.findMentorInfo(memberId);

        deleteCareerByMentorId(mentorInfo.getId());
        List<Career> careers = addCareerRequests.stream()
                .map(career -> mapToCareer(mentorInfo.getId(), career))
                .collect(Collectors.toList());
        return careerRepository.saveAll(careers);
    }

    @Transactional
    public void deleteCareerByMentorId(Long mentorId) {
        careerRepository.deleteAllByMentorId(mentorId);
    }

    private Career mapToCareer(Long mentorInfoId, AddCareerRequest addCareerRequest) {
        return Career.builder()
                .mentorId(mentorInfoId)
                .companyName(addCareerRequest.getCompanyName())
                .department(addCareerRequest.getDepartment())
                .startedDate(addCareerRequest.getStartedDate())
                .endedDate(addCareerRequest.getEndedDate()).build();
    }

    private CareerResponse mapToCareerResponse(Career career) {
        String startedDateStr = formatDate(career.getStartedDate());
        String endedDateStr = formatDate(career.getEndedDate());

        return CareerResponse.builder()
                .companyName(career.getCompanyName())
                .department(career.getDepartment())
                .startedDate(startedDateStr)
                .endedDate(endedDateStr)
                .build();
    }

    private String formatDate(LocalDateTime date) {
        return String.format("%d.%02d", date.getYear(), date.getMonthValue());
    }
}
