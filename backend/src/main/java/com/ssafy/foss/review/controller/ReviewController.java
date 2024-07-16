package com.ssafy.foss.review.controller;

import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Tag(name = "Review", description = "Review 관련 API 입니다.")
@RestController
@RequiredArgsConstructor
@CrossOrigin
@RequestMapping("/api/review")
public class ReviewController {
}
