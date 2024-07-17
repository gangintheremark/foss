package com.ssafy.foss.security.handler;

import com.ssafy.foss.jwt.utils.JwtConstants;
import com.ssafy.foss.jwt.utils.JwtUtils;
import com.ssafy.foss.member.domain.PrincipalDetail;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.Map;

@Slf4j
public class CommonLoginSuccessHandler implements AuthenticationSuccessHandler {

//    @Autowired
//    private RedisUtil redisUtil;

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) throws IOException, ServletException {
        log.info("=== 로그인 성공 ===");

        PrincipalDetail principal = (PrincipalDetail) authentication.getPrincipal();

        log.info("authentication.getPrincipal() = {}", principal);

        Map<String, Object> responseMap = principal.getMemberInfo();
        responseMap.put("accessToken", JwtUtils.generateToken(responseMap, JwtConstants.ACCESS_EXP_TIME));
        responseMap.put("refreshToken", JwtUtils.generateToken(responseMap, JwtConstants.REFRESH_EXP_TIME));

        // Redis에 새로운 refreshToken 추가
//        redisUtil.set((String) responseMap.get("refreshToken"), "refreshToken", JwtConstants.REFRESH_EXP_TIME);

        log.info("로그인한 사용자 식별자: " + responseMap.get("id"));
        response.setContentType("application/json; charset=UTF-8");

        PrintWriter writer = response.getWriter();
        // 리다이렉트 URL에 사용자 정보 추가
        String redirectUrl = "http://localhost:3000?accessToken=" + responseMap.get("accessToken") + "&refreshToken=" + responseMap.get("refreshToken")
                + "&memberId=" + responseMap.get("id");

        // 클라이언트로 리다이렉트
        response.sendRedirect(redirectUrl);
    }
}
