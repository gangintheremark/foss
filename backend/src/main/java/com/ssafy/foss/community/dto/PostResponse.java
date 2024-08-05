package com.ssafy.foss.community.dto;

import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;

@Builder
@Data
public class PostResponse {
    private Long postId;
    private Long memberId;
    private String title;
    private String content;
    private String writer;
    private LocalDateTime regDate;
    private boolean isOwner;
}
