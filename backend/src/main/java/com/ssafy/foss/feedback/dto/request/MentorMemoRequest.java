package com.ssafy.foss.feedback.dto.request;

import lombok.Builder;
import lombok.Data;

@Builder
@Data
public class MentorMemoRequest {
    Long respondentId;
    String content;
}
