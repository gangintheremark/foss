package com.ssafy.foss.schedule.service;

import com.ssafy.foss.schedule.domain.Apply;
import com.ssafy.foss.schedule.domain.ApplyId;
import com.ssafy.foss.schedule.dto.CreateApplyRequest;
import com.ssafy.foss.schedule.repository.ApplyRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

@RequiredArgsConstructor
@Service
@Transactional(readOnly = true)
public class MenteeService {
    private final ApplyRepository applyRepository;
    @Transactional
    public Apply createApply(CreateApplyRequest request, MultipartFile file) {
        String fileUrl = "http://example.com/file3.pdf";
        // String fileUrl = s3Service.fileUpload(null, file);
        return applyRepository.save(buildApply(request.getScheduleId(), request.getMemberId(), fileUrl));
    }

    private Apply buildApply(Long scheduleId, Long memberId, String fileUrl) {
        return Apply.builder()
                .applyId(new ApplyId(scheduleId, memberId))
                .fileUrl(fileUrl)
                .build();
    }

}
