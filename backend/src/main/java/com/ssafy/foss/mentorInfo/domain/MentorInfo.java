package com.ssafy.foss.mentorInfo.domain;

import com.ssafy.foss.mentorInfo.dto.UpdateMentorInfoRequest;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class MentorInfo {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long memberId;

    private String companyName;

    private String department;

    private int years;

    private String selfProduce;

    public void change(UpdateMentorInfoRequest updateMentorInfoRequest) {
        this.companyName = updateMentorInfoRequest.getCompanyName();
        this.department = updateMentorInfoRequest.getDepartment();
        this.years = updateMentorInfoRequest.getYears();
        this.selfProduce = updateMentorInfoRequest.getSelfProduce();
    }
}
