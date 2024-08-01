package com.ssafy.foss.jwt.exception;

import io.jsonwebtoken.ExpiredJwtException;

public class CustomNotExistJwtException extends RuntimeException {
    public CustomNotExistJwtException(String msg) {
        super(msg);
    }
}
