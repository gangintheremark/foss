package com.ssafy.foss.respondent.controller;

import com.ssafy.foss.respondent.service.RespondentService;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@Tag(name = "RespondentController", description = "참여 인원 API")
@RequestMapping("/respondents")
@RestController
@RequiredArgsConstructor
public class RespondentController {
    private final RespondentService interviewService;


}
