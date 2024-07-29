package com.ssafy.foss.review.dto.response;

import lombok.Builder;
import lombok.Data;

@Builder
@Data
public class ReviewMentorInfoResponse {
    Long mentorId;
    String mentorName;
    String companyName;
    String department;
    String profileImg;
}
