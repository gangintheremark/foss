package com.ssafy.foss.feedback.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Builder
@Data
@AllArgsConstructor
@NoArgsConstructor
public class FeedbackMentorInfoResponse {
    Long mentorId;
    String name;
    String companyName;
    String department;
    String profileImg;
    String logoImg;
}