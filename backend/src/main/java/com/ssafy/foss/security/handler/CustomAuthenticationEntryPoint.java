package com.ssafy.foss.security.handler;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.ssafy.foss.error.dto.ResponseErrorDto;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.stereotype.Component;

import java.io.IOException;

/**
 * 비로그인 사용자의 인증 및 인가 실패
 */
@Component
@RequiredArgsConstructor
@Slf4j
public class CustomAuthenticationEntryPoint implements AuthenticationEntryPoint {

    private final ObjectMapper objectMapper;

    @Override
    public void commence(HttpServletRequest request, HttpServletResponse response,
                         AuthenticationException authException) throws IOException, ServletException {
        log.error("인증되지 않은 사용자가 보호된 리소스에 접근 시도: {}", request.getRequestURI());

        ResponseErrorDto responseErrorDto = ResponseErrorDto.builder()
                .code(String.valueOf(HttpServletResponse.SC_UNAUTHORIZED))
                .message("인증되지 않은 사용자입니다.")
                .build();

        response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");

        response.getWriter().write(objectMapper.writeValueAsString(responseErrorDto));
    }
}