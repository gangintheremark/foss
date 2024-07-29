package com.ssafy.foss.schedule.dto.response;

import com.ssafy.foss.member.dto.MentorResponse;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

import java.util.List;

@Data
@AllArgsConstructor
@Builder
public class MentorInfoDetailAndScheduleResponse {
    private MentorResponse mentorInfo;
    private List<ScheduleResponse> scheduleInfos;

}




