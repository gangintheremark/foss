package com.ssafy.foss.jwt.exception;

public class CustomJwtException extends RuntimeException {
    public CustomJwtException(String msg) {
        super(msg);
    }
}
