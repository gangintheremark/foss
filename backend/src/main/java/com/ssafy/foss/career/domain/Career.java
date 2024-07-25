package com.ssafy.foss.career.domain;

import com.ssafy.foss.company.domain.Company;
import com.ssafy.foss.mentorInfo.domain.MentorInfo;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity
@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Career {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "mentor_info_id")
    MentorInfo mentorInfo;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "company_id")
    Company company;

    private String department;

    private LocalDateTime startedDate;

    private LocalDateTime endedDate;

}
