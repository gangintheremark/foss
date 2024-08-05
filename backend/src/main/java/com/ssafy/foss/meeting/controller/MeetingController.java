package com.ssafy.foss.meeting.controller;

import java.util.List;
import java.util.Map;

import com.ssafy.foss.meeting.service.MeetingService;
import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.ssafy.foss.meeting.dto.MeetingDto;
import io.openvidu.java.client.Connection;
import io.openvidu.java.client.OpenVidu;
import io.openvidu.java.client.OpenViduHttpException;
import io.openvidu.java.client.OpenViduJavaClientException;
import io.openvidu.java.client.Session;
import io.openvidu.java.client.SessionProperties;

@RestController
@CrossOrigin
@RequiredArgsConstructor
@RequestMapping("/meeting")
public class MeetingController {

    private final MeetingService meetingService;

    @Value("${OPENVIDU_URL}")
    private String OPENVIDU_URL;

    @Value("${OPENVIDU_SECRET}")
    private String OPENVIDU_SECRET;

    private OpenVidu openvidu;

    @PostConstruct
    public void init() {
        this.openvidu = new OpenVidu(OPENVIDU_URL, OPENVIDU_SECRET);
    }

    @PostMapping("/sessions")
    public ResponseEntity<String> initializeSession(@RequestBody(required = false) Map<String, Object> params)
            throws OpenViduJavaClientException, OpenViduHttpException {
        SessionProperties properties = SessionProperties.fromJson(params).build();
        String sessionId = openvidu.createSession(properties).getSessionId();

        meetingService.saveMeetingInfo(sessionId, (Long) params.get("interviewId"));
        return new ResponseEntity<>(sessionId, HttpStatus.OK);
    }

    @PostMapping("/sessions/{sessionId}/connections")
    public ResponseEntity<String> createConnection(@PathVariable("sessionId") String sessionId,
                                                   @RequestBody(required = false) Map<String, Object> params)
            throws OpenViduJavaClientException, OpenViduHttpException {
        Session session = openvidu.getActiveSession(sessionId);
        if (session == null) return new ResponseEntity<>(HttpStatus.NOT_FOUND);

        Connection connection = meetingService.getConnection(params, session);
        return new ResponseEntity<>(connection.getToken(), HttpStatus.OK);
    }

    @PostMapping("/sessions/{sessionId}/start")
    public ResponseEntity<MeetingDto> startMeeting(@PathVariable("sessionId") String sessionId) {
        return ResponseEntity.ok(meetingService.updateMeetingStatus(sessionId, "ongoing"));
    }

    @PostMapping("/sessions/{sessionId}/end")
    public ResponseEntity<MeetingDto> endMeeting(@PathVariable("sessionId") String sessionId) {
        return ResponseEntity.ok(meetingService.updateMeetingStatus(sessionId, "completed"));
    }

    @GetMapping("/sessions/{sessionId}")
    public ResponseEntity<MeetingDto> getMeetingStatus(@PathVariable("sessionId") String sessionId) {
        return ResponseEntity.ok(meetingService.findMeetingDtoBySessionId(sessionId));
    }

    // 추가: 특정 사용자의 연결 강제로 종료
    @PostMapping("/sessions/{sessionId}/disconnect")
    public ResponseEntity<String> disconnectUser(@PathVariable("sessionId") String sessionId,
                                                 @RequestParam("token") String userToken) {
        try {
            Session session = openvidu.getActiveSession(sessionId);
            if (session == null) return new ResponseEntity<>(HttpStatus.NOT_FOUND);

            List<Connection> activeConnections = session.getActiveConnections();
            for (Connection connection : activeConnections) {
                if (connection.getToken().equals(userToken)) {
                    session.forceDisconnect(connection);
                    return ResponseEntity.ok("User disconnected successfully.");
                }
            }

            return new ResponseEntity<>("User not found.", HttpStatus.NOT_FOUND);
        } catch (OpenViduJavaClientException | OpenViduHttpException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    // 추가: 전체 세션 종료
    @PostMapping("/sessions/{sessionId}/terminate")
    public ResponseEntity<String> terminateSession(@PathVariable("sessionId") String sessionId) {
        try {
            Session session = openvidu.getActiveSession(sessionId);
            if (session == null) return new ResponseEntity<>(HttpStatus.NOT_FOUND);

            List<Connection> activeConnections = session.getActiveConnections();
            for (Connection connection : activeConnections) session.forceDisconnect(connection);
            return ResponseEntity.ok("Session terminated successfully.");
        } catch (OpenViduJavaClientException | OpenViduHttpException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @DeleteMapping("/sessions/{sessionId}")
    public ResponseEntity<Void> deleteMeeting(@PathVariable("sessionId") String sessionId) {
        try {
            meetingService.deleteMeeting(sessionId);
            return ResponseEntity.noContent().build();
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }
}
