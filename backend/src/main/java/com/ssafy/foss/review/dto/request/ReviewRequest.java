package com.ssafy.foss.review.dto.request;

import lombok.Data;

@Data
public class ReviewRequest {
    private Long respondentId;

    private String content;

    private int rating;
}
