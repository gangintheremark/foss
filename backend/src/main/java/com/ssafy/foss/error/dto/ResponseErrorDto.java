package com.ssafy.foss.error.dto;

import lombok.Builder;
import lombok.Getter;

import java.util.Map;

@Getter
public class ResponseErrorDto {

    private final String code;

    private final String message;

    private final Map<String, String> validation;

    @Builder
    public ResponseErrorDto(String code, String message, Map<String, String> validation) {
        this.code = code;
        this.message = message;
        this.validation = validation;
    }

    public void addValidation(String fieldName, String errorMessage) {
        this.validation.put(fieldName, errorMessage);
    }
}
