package com.ssafy.foss.security.handler;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.ssafy.foss.jwt.utils.JwtConstants;
import com.ssafy.foss.jwt.utils.JwtUtils;
import com.ssafy.foss.member.domain.PrincipalDetail;
import com.ssafy.foss.util.IpUtil;
import com.ssafy.foss.util.RedisUtil;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;

import java.io.IOException;
import java.util.Map;

@Slf4j
public class CommonLoginSuccessHandler implements AuthenticationSuccessHandler {

    @Autowired
    private RedisUtil redisUtil;

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) throws IOException, ServletException {
        log.info("=== 로그인 성공 ===");

        PrincipalDetail principal = (PrincipalDetail) authentication.getPrincipal();

        log.info("authentication.getPrincipal() = {}", principal);

        Map<String, Object> responseMap = principal.getMemberInfo();
        String accessToken = JwtUtils.generateToken(responseMap, JwtConstants.ACCESS_EXP_TIME);
        String refreshToken = JwtUtils.generateToken(responseMap, JwtConstants.REFRESH_EXP_TIME);

        // Redis에 새로운 refreshToken 추가
        String clientIp = IpUtil.getClientIp(request);
        redisUtil.set(refreshToken, clientIp, JwtConstants.REFRESH_EXP_TIME);

        log.info("로그인한 사용자 식별자: " + responseMap.get("id"));
        response.setContentType("application/json; charset=UTF-8");

        // JSON 응답으로 토큰과 리다이렉트 URL을 전송
        response.setContentType("application/json; charset=UTF-8");

        responseMap.put(JwtConstants.JWT_HEADER, accessToken);
        responseMap.put(JwtConstants.JWT_REFRESH_HEADER, refreshToken);
        responseMap.put("redirectUrl", "http://localhost:5173");

        ObjectMapper objectMapper = new ObjectMapper();
        response.getWriter().write(objectMapper.writeValueAsString(responseMap));
        response.getWriter().flush();
    }
}
