package com.ssafy.foss.schedule.domain;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.ssafy.foss.member.domain.Member;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Builder
@Getter
@AllArgsConstructor
@Entity
public class Apply {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @ManyToOne
    @JoinColumn(name = "schedule_id")
    private Schedule schedule;
    private Long memberId;
    private String fileUrl;
}
