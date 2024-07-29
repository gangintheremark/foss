package com.ssafy.foss.jwt.controller;

import com.ssafy.foss.jwt.utils.JwtConstants;
import com.ssafy.foss.jwt.utils.JwtUtils;
import com.ssafy.foss.member.domain.PrincipalDetail;
import com.ssafy.foss.util.IpUtil;
import com.ssafy.foss.util.RedisUtil;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.jetbrains.annotations.NotNull;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@Tag(name = "JwtController", description = "실제 토큰 API")
@RequestMapping("/tokens")
@RequiredArgsConstructor
@RestController
public class JwtController {
    private final RedisUtil redisUtil;

    @Operation(summary = "실제 토큰 발급", description = "임시 토큰을 통해 실제 토큰을 발급합니다.")
    @GetMapping
    public ResponseEntity<Map<String, String>> issuanceTokens(HttpServletRequest request, @AuthenticationPrincipal PrincipalDetail principalDetail) {
        return ResponseEntity.ok(tokenMap(request, principalDetail.getMemberInfo()));
    }

    private @NotNull Map<String, String> tokenMap(HttpServletRequest request, Map<String, Object> responseMap) {
        String accessToken = JwtUtils.generateToken(responseMap, JwtConstants.ACCESS_EXP_TIME);
        String refreshToken = JwtUtils.generateToken(responseMap, JwtConstants.REFRESH_EXP_TIME);

        // Redis에 새로운 refreshToken 추가
        String clientIp = IpUtil.getClientIp(request);
        redisUtil.set(refreshToken, clientIp, JwtConstants.REFRESH_EXP_TIME);
        return Map.of(
                JwtConstants.JWT_HEADER, accessToken,
                JwtConstants.JWT_REFRESH_HEADER, refreshToken
        );
    }
}
