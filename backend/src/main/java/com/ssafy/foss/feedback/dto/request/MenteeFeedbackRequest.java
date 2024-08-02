package com.ssafy.foss.feedback.dto.request;

import lombok.Builder;
import lombok.Data;

@Builder
@Data
public class MenteeFeedbackRequest {
    Long menteeId;
    String content;
}
