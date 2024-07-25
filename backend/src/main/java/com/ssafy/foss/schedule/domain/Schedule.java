package com.ssafy.foss.schedule.domain;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.ssafy.foss.member.domain.Member;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Builder
@Getter
@NoArgsConstructor
@AllArgsConstructor
@ToString
@Entity
public class Schedule {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long scheduleId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id")
    Member member;

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm")
    private LocalDateTime date;

    private boolean isConfirmed;

    public void updateConfirmStatus(boolean isConfirmed) {
        this.isConfirmed = isConfirmed;
    }
}
