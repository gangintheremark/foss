package com.ssafy.foss.feedback.dto.response;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class MenteeFeedbackResponse {
    Long menteeId;
    String content;
    boolean isEvaluated;
}
