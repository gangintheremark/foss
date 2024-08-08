//package com.ssafy.foss.returnzeroAI.service;
//
//import com.ssafy.foss.returnzeroAI.responseDTO.AuthResponse;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.beans.factory.annotation.Value;
//import org.springframework.stereotype.Service;
//import org.springframework.util.LinkedMultiValueMap;
//import org.springframework.util.MultiValueMap;
//import org.springframework.web.client.RestTemplate;
//
//@Service
//public class ReturnZeroService {
//
//    @Value("${ReturnZero.client_id}")
//    private String client_id;
//
//    @Value("${ReturnZero.client_secret}")
//    private String client_secret;
//
//    @Autowired
//    private RestTemplate restTemplate;
//
//    public AuthResponse getToken(){
//        String url = "https://openapi.vito.ai/v1/authenticate";
//
//        System.out.println("client_id = " + client_id);
//        System.out.println("client_secret = " + client_secret);
//
//        MultiValueMap<String, String> body = new LinkedMultiValueMap<>();
//        body.add("client_id", "your_client_id");
//        body.add("client_secret", "your_client_secret");
//    }
//}
