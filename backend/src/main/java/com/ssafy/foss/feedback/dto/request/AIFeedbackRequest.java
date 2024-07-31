package com.ssafy.foss.feedback.dto.request;

import lombok.Builder;
import lombok.Data;

@Builder
@Data
public class AIFeedbackRequest {
    private Long respondentId;
    private String goodPoint;
    private String badPoint;
    private String summary;
}
