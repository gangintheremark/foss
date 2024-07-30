package com.ssafy.foss.meetingNotification.service;

import com.ssafy.foss.meetingNotification.domain.MeetingNotification;
import com.ssafy.foss.meetingNotification.repository.MeetingNotificationRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class MeetingNotificationService {

    private final MeetingNotificationRepository meetingNotificationRepository;

    public MeetingNotificationService(MeetingNotificationRepository meetingNotificationRepository) {
        this.meetingNotificationRepository = meetingNotificationRepository;
    }

    public void notifyParticipant(String sessionId, Long memberId) {
        List<MeetingNotification> notifications = meetingNotificationRepository.findBySessionIdAndMemberId(sessionId, memberId);
        if (notifications.isEmpty()) {
            MeetingNotification meetingNotification = new MeetingNotification();
            meetingNotification.setSessionId(sessionId);
            meetingNotification.setMemberId(memberId);
            meetingNotification.setHasReceivedNotification(true);
            meetingNotificationRepository.save(meetingNotification);
        } else {
            MeetingNotification meetingNotification = notifications.get(0);
            meetingNotification.setHasReceivedNotification(true);
            meetingNotificationRepository.save(meetingNotification);
        }
    }

    public boolean hasReceivedNotification(String sessionId, Long memberId) {
        List<MeetingNotification> notifications = meetingNotificationRepository.findBySessionIdAndMemberId(sessionId, memberId);
        if (notifications.isEmpty()) {
            return false;
        } else {
            return notifications.get(0).isHasReceivedNotification();
        }
    }

    public String findSessionIdByMemberId(Long memberId) {
        return meetingNotificationRepository.findByMemberId(memberId)
                .map(MeetingNotification::getSessionId)
                .orElse(null);
    }
}
