package com.ssafy.foss.jwt.filter;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.ssafy.foss.jwt.exception.CustomJwtException;
import com.ssafy.foss.jwt.exception.CustomNotExistJwtException;
import com.ssafy.foss.jwt.utils.JwtConstants;
import com.ssafy.foss.jwt.utils.JwtUtils;
import com.ssafy.foss.util.IpUtil;
import com.ssafy.foss.util.RedisUtil;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.extern.slf4j.Slf4j;
import org.apache.http.HttpStatus;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.util.PatternMatchUtils;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.Map;

@Slf4j
@Component
public class JwtVerifyFilter extends OncePerRequestFilter {

    @Autowired
    private RedisUtil redisUtil;
    private static final String[] whitelist = {"/swagger-ui/**", "/v3/**", "/api/companies",
            "/api/mentors/cards/**"};

    @Override
    protected boolean shouldNotFilter(HttpServletRequest request) throws ServletException {
        String requestURI = request.getRequestURI();
        log.info("요청받은 URI: " + requestURI);

        return false;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        String requestURI = request.getRequestURI();
        String authHeader = request.getHeader(JwtConstants.JWT_HEADER);
        String refreshToken = request.getHeader(JwtConstants.JWT_REFRESH_HEADER);

        try {
            if (refreshToken != null && !requestURI.equals("/members/logout")) {
                handleRefreshToken(request, response, refreshToken);
                return;
            }

            if (authHeader != null) {
                handleAccessToken(request, response, filterChain, authHeader);
            } else {
                proceedToNextFilter(request, response, filterChain, requestURI);
            }
        } catch (Exception e) {
            handleException(response, e);
        }
    }

    private void handleRefreshToken(HttpServletRequest request, HttpServletResponse response, String refreshToken) {
        checkRefreshAuthorizationHeader(refreshToken);
        Map<String, Object> claims = JwtUtils.validateToken(refreshToken);
        String clientIp = IpUtil.getClientIp(request);

        log.info("재발급 요청이 들어온 IP 주소: {}", clientIp);
        String ip = (String) redisUtil.get(refreshToken);

        if (ip == null) {
            log.error("이미 사용된 리프레시 토큰입니다.");
            throw new RuntimeException("이미 사용된 리프레시 토큰입니다.");
        } else if (clientIp.equals(ip)) {
            redisUtil.delete(refreshToken);
            String accessToken = JwtUtils.generateToken(claims, JwtConstants.ACCESS_EXP_TIME);
            refreshToken = JwtUtils.generateToken(claims, JwtConstants.REFRESH_EXP_TIME);
            redisUtil.set(refreshToken, clientIp, JwtConstants.REFRESH_EXP_TIME);

            response.setHeader(JwtConstants.JWT_HEADER, accessToken);
            response.setHeader(JwtConstants.JWT_REFRESH_HEADER, refreshToken);
        } else {
            throw new RuntimeException("최초 IP와 동일하지 않습니다.");
        }
    }

    private void handleAccessToken(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain, String authHeader) throws IOException, ServletException {
        checkAuthorizationHeader(authHeader);
        if (redisUtil.hasKeyBlackList(authHeader)) {
            log.error("BlackList 처리 된 토큰입니다.");
            throw new RuntimeException("BlackList 처리 된 토큰입니다.");
        }

        String token = JwtUtils.getTokenFromHeader(authHeader);
        Authentication authentication = JwtUtils.getAuthentication(token);

        SecurityContextHolder.getContext().setAuthentication(authentication);
        filterChain.doFilter(request, response);
    }

    private void proceedToNextFilter(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain, String requestURI) throws IOException, ServletException {
        if (PatternMatchUtils.simpleMatch(whitelist, requestURI)) {
            log.info("- 토큰이 없지만 허용된 경로입니다.");
            filterChain.doFilter(request, response);
        }
        checkAuthorizationHeader(null);
    }

    private void handleException(HttpServletResponse response, Exception e) throws IOException {
        Map<String, String> error = Map.of("error", e.getMessage());

        response.setContentType("application/json; charset=UTF-8");
        response.setStatus(HttpStatus.SC_UNAUTHORIZED);

        ObjectMapper objectMapper = new ObjectMapper();
        String errorJson = objectMapper.writeValueAsString(error);
        response.getWriter().write(errorJson);
    }

    private static void checkAuthorizationHeader(String header) {
        if (header == null || header.equals("Bearer null")) {
            log.error("토큰이 존재하지 않습니다.");
            throw new CustomNotExistJwtException("토큰이 존재하지 않습니다.");
        } else if (!header.startsWith(JwtConstants.JWT_TYPE)) {
            throw new CustomJwtException("BEARER 로 시작하지 않는 올바르지 않은 토큰 형식입니다");
        }
    }

    private static void checkRefreshAuthorizationHeader(String header) {
        if (header == null) {
            log.error("토큰이 존재하지 않습니다.");
            throw new CustomJwtException("토큰이 존재하지 않습니다.");
        }
    }
}

