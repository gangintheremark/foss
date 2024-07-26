package com.ssafy.foss.schedule.domain;

import com.ssafy.foss.member.domain.Member;
import jakarta.persistence.*;
import lombok.*;
import net.minidev.json.annotate.JsonIgnore;

@Builder
@Getter
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class Apply {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "schedule_id")
    private Schedule schedule;

    @ManyToOne
    @JoinColumn(name = "member_id")
    private Member member;
    private String fileUrl;
}
