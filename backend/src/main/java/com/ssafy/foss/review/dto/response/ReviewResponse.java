package com.ssafy.foss.review.dto.response;

import lombok.Builder;
import lombok.Data;

@Builder
@Data
public class ReviewResponse {
    ReviewInfoResponse reviewInfo;
    ReviewMentorInfoResponse mentorInfoResponse;
}
