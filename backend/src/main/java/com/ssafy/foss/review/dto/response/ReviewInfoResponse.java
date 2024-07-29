package com.ssafy.foss.review.dto.response;

import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;

@Builder
@Data
public class ReviewInfoResponse {
    String writer;
    int rating;
    String content;
    LocalDateTime date;
}
