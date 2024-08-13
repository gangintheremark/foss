package com.ssafy.foss.notification.dto;

import lombok.Builder;
import lombok.Data;


@Data
@Builder
public class NotificationResponse {
    private Long id;

    private String content;

    private String targetUrl;

    private boolean isRead;

    private String createdDate;
}
