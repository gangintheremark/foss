package com.ssafy.foss.review.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Builder
@Data
@AllArgsConstructor
@NoArgsConstructor
public class ReviewInfoResponse {
    String writer;
    int rating;
    String content;
    LocalDateTime date;
}
