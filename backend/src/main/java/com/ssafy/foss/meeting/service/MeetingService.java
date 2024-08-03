package com.ssafy.foss.meeting.service;

import com.ssafy.foss.meeting.domain.MeetingInfo;
import com.ssafy.foss.meeting.dto.MeetingDto;
import com.ssafy.foss.meeting.repository.MeetingRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.net.http.HttpHeaders;
import java.time.LocalDateTime;
import java.util.Optional;

@Service
public class MeetingService {

    @Autowired
    private MeetingRepository meetingRepository;


    public MeetingDto updateMeetingStatus(String sessionId, String status) {
        Optional<MeetingInfo> optionalMeetingInfo = meetingRepository.findBySessionId(sessionId);

        if (optionalMeetingInfo.isPresent()) {
            MeetingInfo meetingInfo = optionalMeetingInfo.get();
            meetingInfo.setStatus(status);

            // Set endTime when status is 'completed'
            if ("completed".equals(status)) {
                meetingInfo.setEndTime(LocalDateTime.now());
            }

            MeetingInfo updatedMeetingInfo = meetingRepository.save(meetingInfo);

            return convertToDto(updatedMeetingInfo);
        } else {
            throw new RuntimeException("Meeting not found");
        }
    }


    public MeetingDto getMeeting(String sessionId) {
        Optional<MeetingInfo> optionalMeetingInfo = meetingRepository.findBySessionId(sessionId);

        if (optionalMeetingInfo.isPresent()) {
            return convertToDto(optionalMeetingInfo.get());
        } else {
            return null;
        }
    }

    public MeetingInfo saveMeetingInfo(MeetingInfo meetingInfo) {
        return meetingRepository.save(meetingInfo);
    }


    private MeetingDto convertToDto(MeetingInfo meetingInfo) {
        MeetingDto meetingDto = new MeetingDto();
        meetingDto.setId(meetingInfo.getId());
        meetingDto.setSessionId(meetingInfo.getSessionId());
        meetingDto.setStatus(meetingInfo.getStatus());
        meetingDto.setStartTime(meetingInfo.getStartTime());
        meetingDto.setEndTime(meetingInfo.getEndTime());
        return meetingDto;
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
