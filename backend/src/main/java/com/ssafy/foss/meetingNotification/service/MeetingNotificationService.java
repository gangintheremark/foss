package com.ssafy.foss.meetingNotification.service;

import com.ssafy.foss.meeting.domain.MeetingInfo;
import com.ssafy.foss.meeting.service.MeetingService;
import com.ssafy.foss.meetingNotification.domain.MeetingNotification;
import com.ssafy.foss.meetingNotification.repository.MeetingNotificationRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class MeetingNotificationService {

    private final MeetingNotificationRepository meetingNotificationRepository;
    private final MeetingService meetingService;

    @Transactional
    public void notifyParticipant(String sessionId, Long memberId) {
        Optional<MeetingNotification> meetingNotificationOptional = meetingNotificationRepository.findBySessionIdAndMemberId(sessionId, memberId);
        MeetingInfo meetingInfo = meetingService.findBySessionId(sessionId);

        MeetingNotification meetingNotification = meetingNotificationOptional.orElseGet(() ->
                mapToMeetingNotification(sessionId, memberId, meetingInfo)
        );

        if (!meetingNotificationOptional.isPresent()) {
            meetingNotificationRepository.save(meetingNotification);
        } else {
            meetingNotification.setHasReceivedNotification(true);
            meetingNotificationRepository.save(meetingNotification);
        }
    }

    private static MeetingNotification mapToMeetingNotification(String sessionId, Long memberId, MeetingInfo meetingInfo) {
        return MeetingNotification.builder()
                .sessionId(sessionId)
                .memberId(memberId)
                .hasReceivedNotification(true)
                .meeting(meetingInfo)
                .build();
    }

    public boolean hasReceivedNotification(String sessionId, Long memberId) {
        Optional<MeetingNotification> meetingNotificationOptional = meetingNotificationRepository.findBySessionIdAndMemberId(sessionId, memberId);
        if (!meetingNotificationOptional.isPresent()) {
            return false;
        } else {
            return meetingNotificationOptional.get().isHasReceivedNotification();
        }
    }

    public String findSessionIdByMemberId(Long memberId) {
        return meetingNotificationRepository.findByMemberId(memberId)
                .map(MeetingNotification::getSessionId)
                .orElse(null);
    }


    public void removeAllNotifications(String sessionId) {
        meetingNotificationRepository.deleteAllBySessionId(sessionId);
    }


}
