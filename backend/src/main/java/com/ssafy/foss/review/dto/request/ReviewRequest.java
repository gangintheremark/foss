package com.ssafy.foss.review.dto.request;

import lombok.Getter;

@Getter
public class ReviewRequest {
    private Long respondentId;

    private String content;

    private int rating;
}
