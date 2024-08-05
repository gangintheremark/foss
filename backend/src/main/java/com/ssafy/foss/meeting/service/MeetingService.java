package com.ssafy.foss.meeting.service;

import com.ssafy.foss.interview.service.InterviewService;
import com.ssafy.foss.meeting.domain.MeetingInfo;
import com.ssafy.foss.meeting.dto.MeetingDto;
import com.ssafy.foss.meeting.repository.MeetingRepository;
import io.openvidu.java.client.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.Map;
import java.util.Optional;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class MeetingService {

    private final MeetingRepository meetingRepository;
    private final InterviewService interviewService;

    @Transactional
    public MeetingInfo saveMeetingInfo(String sessionId, Long interviewId) {
        MeetingInfo meetingInfo = new MeetingInfo();
        meetingInfo.setSessionId(sessionId);
        meetingInfo.setInterview(interviewService.findById(interviewId));

        return meetingRepository.save(meetingInfo);
    }

    public MeetingInfo findBySessionId(String sessionId) {
        MeetingInfo meetingInfo = meetingRepository.findBySessionId(sessionId)
                .orElseThrow(() -> new RuntimeException("Meeting not found"));

        return meetingInfo;
    }

    public MeetingDto findMeetingDtoBySessionId(String sessionId) {
        MeetingInfo meetingInfo = findBySessionId(sessionId);

        return mapToMeetingDto(meetingInfo);
    }

    @Transactional
    public MeetingDto updateMeetingStatus(String sessionId, String status) {
        Optional<MeetingInfo> optionalMeetingInfo = meetingRepository.findBySessionId(sessionId);
        MeetingInfo meetingInfo = optionalMeetingInfo.orElseThrow(
                () -> new RuntimeException("Meeting not found"));

        meetingInfo.setStatus(status);
        if ("completed".equals(status)) meetingInfo.setEndTime(LocalDateTime.now());

        return mapToMeetingDto(meetingInfo);
    }

    private MeetingDto mapToMeetingDto(MeetingInfo meetingInfo) {
        return MeetingDto.builder()
                .id(meetingInfo.getId())
                .sessionId(meetingInfo.getSessionId())
                .status(meetingInfo.getStatus())
                .startTime(meetingInfo.getStartTime())
                .endTime(meetingInfo.getEndTime()).build();
    }

    public Connection getConnection(Map<String, Object> params, Session session) throws OpenViduJavaClientException, OpenViduHttpException {
        ConnectionProperties properties = ConnectionProperties.fromJson(params).build();
        Connection connection = session.createConnection(properties);
        return connection;
    }
    @Transactional
    public void deleteMeeting(String sessionId) {
        Optional<MeetingInfo> optionalMeetingInfo = meetingRepository.findBySessionId(sessionId);

        if (optionalMeetingInfo.isPresent()) {
            MeetingInfo meetingInfo = optionalMeetingInfo.get();
            meetingRepository.delete(meetingInfo);
        } else {
            throw new RuntimeException("Meeting not found");
        }
    }




}
