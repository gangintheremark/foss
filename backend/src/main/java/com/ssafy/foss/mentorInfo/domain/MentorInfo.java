package com.ssafy.foss.mentorInfo.domain;

import com.ssafy.foss.company.domain.Company;
import com.ssafy.foss.member.domain.Member;
import com.ssafy.foss.mentorInfo.dto.UpdateMentorInfoRequest;
import jakarta.persistence.*;
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

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id")
    private Member member;

    @Column(length = 1000)  // 길이를 1000자로 설정
    private String selfProduce;

    private String fileUrl;

    public void change(UpdateMentorInfoRequest updateMentorInfoRequest, String fileUrl) {
        this.selfProduce = updateMentorInfoRequest.getSelfProduce();
        this.fileUrl = fileUrl;
    }

    public void changeSelfProduce(String selfProduce) {
        this.selfProduce = selfProduce;
    }
}
