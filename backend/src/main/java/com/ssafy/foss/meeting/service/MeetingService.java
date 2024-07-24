package com.ssafy.foss.meeting.service;

import com.ssafy.foss.meeting.domain.MeetingInfo;
import com.ssafy.foss.meeting.dto.MeetingDto;
import com.ssafy.foss.meeting.repository.MeetingRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class MeetingService {

    @Autowired
    private MeetingRepository meetingRepository;

    public MeetingDto saveMeeting(MeetingDto meetingDto) {
        // DTO를 엔티티로 변환
        MeetingInfo meeting = new MeetingInfo(
                meetingDto.getSessionId(),
                meetingDto.getUserName(),
                meetingDto.getToken()
        );

        // 엔티티 저장
        MeetingInfo savedMeeting = meetingRepository.save(meeting);

        // 엔티티를 DTO로 변환하여 반환
        return new MeetingDto(
                savedMeeting.getId(),
                savedMeeting.getSessionId(),
                savedMeeting.getUserName(),
                savedMeeting.getToken()
        );
    }
}
