package com.ssafy.foss.returnzeroAI.controller;

import com.ssafy.foss.returnzeroAI.responseDTO.AuthResponse;
import com.ssafy.foss.returnzeroAI.service.ReturnZeroService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin
@RestController
@RequestMapping("/returnzero")
public class ReturnZeroController {

    @Autowired
    private ReturnZeroService returnZeroService;

    // 리턴제로야 토큰줘
    @GetMapping("/authenticate")
    public ResponseEntity<AuthResponse> authenticate() {


        AuthResponse authResponse = returnZeroService.getToken();

        return ResponseEntity.ok(authResponse);
    }

    // 리턴제로야 데이터 줘
}
