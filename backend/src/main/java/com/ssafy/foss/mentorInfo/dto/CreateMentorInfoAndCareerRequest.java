package com.ssafy.foss.mentorInfo.dto;


import com.ssafy.foss.career.dto.AddCareerRequest;
import lombok.Data;

import java.util.List;

@Data
public class CreateMentorInfoAndCareerRequest {
    private String selfProduce;
    private List<AddCareerRequest> careers;
}
