// MeetingNotificationService.java
package com.ssafy.foss.meetingNotification.service;

import com.ssafy.foss.meetingNotification.domain.MeetingNotification;
import com.ssafy.foss.meetingNotification.repository.MeetingNotificationRepository;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class MeetingNotificationService {

    private final MeetingNotificationRepository meetingNotificationRepository;

    public MeetingNotificationService(MeetingNotificationRepository meetingNotificationRepository) {
        this.meetingNotificationRepository = meetingNotificationRepository;
    }

    public void notifyParticipant(String sessionId, Long memberId) {
        MeetingNotification meetingNotification = meetingNotificationRepository.findBySessionIdAndMemberId(sessionId, memberId)
                .orElse(new MeetingNotification());
        meetingNotification.setSessionId(sessionId);
        meetingNotification.setMemberId(memberId);
        meetingNotification.setHasReceivedNotification(true);
        meetingNotificationRepository.save(meetingNotification);
    }

//    public void saveMeetingNotification(MeetingNotification meetingNotification) {
//        meetingNotificationRepository.save(meetingNotification);
//    }


    public boolean hasReceivedNotification(String sessionId, Long memberId) {
        return meetingNotificationRepository.findBySessionIdAndMemberId(sessionId, memberId)
                .map(MeetingNotification::isHasReceivedNotification)
                .orElse(false);
    }

    public String findSessionIdByMemberId(Long memberId) {
        // Get the first available sessionId for the given memberId
        return meetingNotificationRepository.findByMemberId(memberId)
                .map(MeetingNotification::getSessionId)
                .orElse(null);
    }
}

