package com.ssafy.foss.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {
    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**")
                .allowedOrigins("http://localhost:5173", "https://localhost:5173",
                        "http://i11a705.p.ssafy.io:5173", "https://i11a705.p.ssafy.io:5173",
                        "https://i11a705.p.ssafy.io:8080") // 허용할 도메인 설정
                .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTION") // 허용할 HTTP 메소드 설정
                .allowedHeaders("*")
                .allowCredentials(true); // 인증 정보 허용 여부
    }
}
