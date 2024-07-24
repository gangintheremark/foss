package com.ssafy.foss.jwt.controller;

import com.ssafy.foss.jwt.utils.JwtConstants;
import com.ssafy.foss.jwt.utils.JwtUtils;
import com.ssafy.foss.member.domain.PrincipalDetail;
import jakarta.servlet.http.HttpServletRequest;
import org.jetbrains.annotations.NotNull;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RequestMapping("/tokens")
@RestController
public class JwtController {

    @GetMapping
    public ResponseEntity<Map<String, String>> issuanceTokens(HttpServletRequest request, @AuthenticationPrincipal PrincipalDetail principalDetail) {
        return ResponseEntity.ok(tokenMap(principalDetail.getMemberInfo()));
    }

    private static @NotNull Map<String, String> tokenMap(Map<String, Object> responseMap) {
        String accessToken = JwtUtils.generateToken(responseMap, JwtConstants.ACCESS_EXP_TIME);
        String refreshToken = JwtUtils.generateToken(responseMap, JwtConstants.REFRESH_EXP_TIME);

        return Map.of(
                JwtConstants.JWT_HEADER, accessToken,
                JwtConstants.JWT_REFRESH_HEADER, refreshToken
        );
    }
}
