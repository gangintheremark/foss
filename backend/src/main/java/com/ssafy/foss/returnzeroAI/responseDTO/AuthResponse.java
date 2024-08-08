package com.ssafy.foss.returnzeroAI.responseDTO;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class AuthResponse {

    private String token;
    private int expiresIn;
}
