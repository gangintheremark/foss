package com.ssafy.foss.jwt.filter;

import com.google.gson.Gson;
import com.ssafy.foss.jwt.exception.CustomExpiredJwtException;
import com.ssafy.foss.jwt.exception.CustomJwtException;
import com.ssafy.foss.jwt.utils.JwtConstants;
import com.ssafy.foss.jwt.utils.JwtUtils;
import com.ssafy.foss.util.IpUtil;
import com.ssafy.foss.util.RedisUtil;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.util.PatternMatchUtils;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.Map;

@Slf4j
@Component
public class JwtVerifyFilter extends OncePerRequestFilter {

    @Autowired
    private RedisUtil redisUtil;
    private static final String[] whitelist = {"/swagger-ui/**", "/v3/**"};

    @Override
    protected boolean shouldNotFilter(HttpServletRequest request) throws ServletException {
        String requestURI = request.getRequestURI();
        log.info("요청받은 URI: " + requestURI);

//       return true; //나중에 삭제해야함.
        return false;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        String requestURI = request.getRequestURI();
        String authHeader = request.getHeader(JwtConstants.JWT_HEADER);
        String refreshToken = request.getHeader(JwtConstants.JWT_REFRESH_HEADER);

        try {
            if (refreshToken != null) {
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

        if (clientIp.equals(redisUtil.get(refreshToken))) {
            String accessToken = JwtUtils.generateToken(claims, JwtConstants.ACCESS_EXP_TIME);
            response.setHeader(JwtConstants.JWT_HEADER, accessToken);
        } else {
            throw new RuntimeException("최초 IP와 동일하지 않습니다.");
        }
    }

    private void handleAccessToken(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain, String authHeader) throws IOException, ServletException {
        checkAuthorizationHeader(authHeader);
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
    }

    private void handleException(HttpServletResponse response, Exception e) throws IOException {
        Gson gson = new Gson();
        String json = gson.toJson(e instanceof CustomExpiredJwtException ?
                Map.of("Token_Expired", e.getMessage()) :
                Map.of("error", e.getMessage()));

        response.setContentType("application/json; charset=UTF-8");
        try (PrintWriter printWriter = response.getWriter()) {
            printWriter.println(json);
        }
    }

    private static void checkAuthorizationHeader(String header) {
        if (header == null || header.equals("Bearer null")) {
            log.error("토큰이 존재하지 않습니다.");
            throw new CustomJwtException("토큰이 존재하지 않습니다.");
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

