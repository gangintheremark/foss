package com.ssafy.foss.review.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

@Builder
@Data
@AllArgsConstructor
@NoArgsConstructor
public class ReviewInfoResponse {
    String writer;
    int rating;
    String content;
    String date;

    public ReviewInfoResponse(String writer, int rating, String content, LocalDateTime date){
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm");
        this.writer =writer;
        this.rating =rating;
        this.content =content;
        this.date = date.format(formatter);
    }
}
