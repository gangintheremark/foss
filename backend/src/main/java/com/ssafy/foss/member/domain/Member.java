package com.ssafy.foss.member.domain;

import com.ssafy.foss.member.dto.UpdateMemberRequest;
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
public class Member {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    private String email;

    private double temperature;

    private String profileImg;

    private String socialId;

    @Enumerated(EnumType.STRING)
    private Role role;

    public void setRole(Role role) {
        this.role = role;
    }

    public void change(UpdateMemberRequest updateMemberRequest, String profileImg) {
        this.email = updateMemberRequest.getEmail();
        this.profileImg = profileImg;
    }

    public void change(UpdateMemberRequest updateMemberRequest) {
        this.email = updateMemberRequest.getEmail();
    }

    public void adjustTemperature(int rating) {
        switch (rating) {
            case 1:
                this.temperature = Math.round((this.temperature - 0.5) * 10) / 10.0;
                break;
            case 2:
                this.temperature = Math.round((this.temperature - 0.3) * 10) / 10.0;
                break;
            case 3:
                // 온도 변화 없음
                break;
            case 4:
                this.temperature = Math.round((this.temperature + 0.3) * 10) / 10.0;
                break;
            case 5:
                this.temperature = Math.round((this.temperature + 0.5) * 10) / 10.0;
                break;
            default:
                throw new IllegalArgumentException("Invalid rating value: " + rating);
        }
    }

}
