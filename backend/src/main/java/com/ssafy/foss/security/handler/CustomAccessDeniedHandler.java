package com.ssafy.foss.security.handler;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.ssafy.foss.error.dto.ResponseErrorDto;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.web.access.AccessDeniedHandler;
import org.springframework.stereotype.Component;

import java.io.IOException;

/**
 * 로그인 사용자의 인가 실패
 */
@Component
@RequiredArgsConstructor
@Slf4j
public class CustomAccessDeniedHandler implements AccessDeniedHandler {

    private final ObjectMapper objectMapper;

    @Override
    public void handle(HttpServletRequest request, HttpServletResponse response,
                       AccessDeniedException ex) throws IOException, ServletException {
        log.error("인가 받지 않은 사용자가 보호된 리소스에 접근 시도: {}", request.getRequestURI());

        ResponseErrorDto responseErrorDto = ResponseErrorDto.builder()
                .code(String.valueOf(HttpServletResponse.SC_FORBIDDEN))
                .message("권한이 존재하지 않는 사용자입니다.")
                .build();

        response.setStatus(HttpServletResponse.SC_FORBIDDEN);
        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");

        response.getWriter().write(objectMapper.writeValueAsString(responseErrorDto));
    }
}
