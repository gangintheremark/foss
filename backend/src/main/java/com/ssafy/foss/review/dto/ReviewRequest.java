package com.ssafy.foss.review.dto;

import lombok.Getter;

@Getter
public class ReviewRequest {
    private Long mentorId;

    private String content;

    private int rating;
}
