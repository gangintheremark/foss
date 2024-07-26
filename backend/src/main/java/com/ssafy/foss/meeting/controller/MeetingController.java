package com.ssafy.foss.meeting.controller;

import java.util.Map;

import com.ssafy.foss.meeting.domain.MeetingInfo;
import com.ssafy.foss.meeting.service.MeetingService;
import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.ssafy.foss.meeting.dto.MeetingDto;
import io.openvidu.java.client.Connection;
import io.openvidu.java.client.ConnectionProperties;
import io.openvidu.java.client.OpenVidu;
import io.openvidu.java.client.OpenViduHttpException;
import io.openvidu.java.client.OpenViduJavaClientException;
import io.openvidu.java.client.Session;
import io.openvidu.java.client.SessionProperties;

@RestController
@CrossOrigin
@RequestMapping("/meeting")
public class MeetingController {

    @Autowired
    private MeetingService meetingService;

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
        Session session = openvidu.createSession(properties);


        MeetingInfo meetingInfo = new MeetingInfo();
        meetingInfo.setSessionId(session.getSessionId());
        meetingService.saveMeetingInfo(meetingInfo);

        return new ResponseEntity<>(session.getSessionId(), HttpStatus.OK);
    }



    @PostMapping("/sessions/{sessionId}/connections")
    public ResponseEntity<String> createConnection(@PathVariable("sessionId") String sessionId,
                                                   @RequestBody(required = false) Map<String, Object> params)
            throws OpenViduJavaClientException, OpenViduHttpException {
        Session session = openvidu.getActiveSession(sessionId);
        if (session == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        ConnectionProperties properties = ConnectionProperties.fromJson(params).build();
        Connection connection = session.createConnection(properties);
        return new ResponseEntity<>(connection.getToken(), HttpStatus.OK);
    }

    @PostMapping("/sessions/{sessionId}/start")
    public ResponseEntity<MeetingDto> startMeeting(@PathVariable("sessionId") String sessionId) {
        try {
            MeetingDto meetingDto = meetingService.updateMeetingStatus(sessionId, "ongoing");
            return ResponseEntity.ok(meetingDto);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }


    @PostMapping("/sessions/{sessionId}/end")
    public ResponseEntity<MeetingDto> endMeeting(@PathVariable("sessionId") String sessionId) {
        try {
            MeetingDto meetingDto = meetingService.updateMeetingStatus(sessionId, "completed");
            return ResponseEntity.ok(meetingDto);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }


    @GetMapping("/sessions/{sessionId}")
    public ResponseEntity<MeetingDto> getMeetingStatus(@PathVariable("sessionId") String sessionId) {
        try {
            MeetingDto meetingDto = meetingService.getMeeting(sessionId);
            if (meetingDto == null) {
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
            }
            return ResponseEntity.ok(meetingDto);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
}
