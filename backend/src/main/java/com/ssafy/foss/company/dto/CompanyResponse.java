package com.ssafy.foss.company.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
@AllArgsConstructor
public class CompanyResponse {
    private Long id;

    private String name;

    private String logoImg;
}
