package com.ssafy.foss.respondent.controller;

import com.ssafy.foss.respondent.service.RespondentService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RequestMapping("/respondents")
@RestController
@RequiredArgsConstructor
public class RespondentController {
    private final RespondentService interviewService;



}
