package com.ssafy.foss.mypage.dto;


import com.ssafy.foss.career.dto.AddCareerRequest;
import lombok.Data;

import java.util.List;

@Data
public class CreateMentorInfoAndCareerRequest {
    private String selfProduce;
    private List<AddCareerRequest> addCareerRequests;
}
