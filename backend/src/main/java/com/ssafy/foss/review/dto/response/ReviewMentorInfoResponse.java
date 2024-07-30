package com.ssafy.foss.review.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Builder
@Data
@AllArgsConstructor
@NoArgsConstructor
public class ReviewMentorInfoResponse {
    Long mentorId;
    String name;
    String companyName;
    String department;
    String profileImg;
}
