package com.ssafy.foss.participant.controller;

import com.ssafy.foss.participant.domain.Participant;
import com.ssafy.foss.participant.service.ParticipantService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/participants")
public class ParticipantController {

    private final ParticipantService participantService;

    public ParticipantController(ParticipantService participantService) {
        this.participantService = participantService;
    }

    @PostMapping("/meetings/{meetingId}")
    public ResponseEntity<Participant> createParticipant(
            @PathVariable Long meetingId,
            @RequestBody Participant participant) {
        Participant createdParticipant = participantService.createParticipant(meetingId, participant);
        return createdParticipant != null ? ResponseEntity.ok(createdParticipant) : ResponseEntity.notFound().build();
    }

    @GetMapping("/meetings/{sessionId}")
    public ResponseEntity<List<Participant>> getParticipantsByMeeting(
            @PathVariable String sessionId) {
        List<Participant> participants = participantService.getParticipantsByMeeting(sessionId);
        return ResponseEntity.ok(participants);
    }

    @PutMapping("/{memberId}")
    public ResponseEntity<Participant> updateParticipant(
            @PathVariable Long memberId,
            @RequestBody Participant participantDetails) {
        Participant updatedParticipant = participantService.updateParticipant(memberId, participantDetails);
        return updatedParticipant != null ? ResponseEntity.ok(updatedParticipant) : ResponseEntity.notFound().build();
    }

    @DeleteMapping("/{memberId}")
    public ResponseEntity<Void> deleteParticipant(@PathVariable Long memberId) {
        participantService.deleteParticipant(memberId);
        return ResponseEntity.noContent().build();
    }


}
