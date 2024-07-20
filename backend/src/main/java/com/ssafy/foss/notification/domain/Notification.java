package com.ssafy.foss.notification.domain;

import com.ssafy.foss.util.BaseTimeEntity;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.CreatedDate;

import java.time.LocalDateTime;

@Entity
@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Notification extends BaseTimeEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long senderId;

    private Long receiverId;

    @Enumerated(EnumType.STRING)
    private Type type;

    private String content;

    private String targetUrl;

    private boolean isRead;

    @CreatedDate
    private LocalDateTime createdDate;

    public void setIsRead(boolean isRead) {
        this.isRead = isRead;
    }
}
