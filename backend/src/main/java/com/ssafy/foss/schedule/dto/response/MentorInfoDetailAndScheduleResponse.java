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
    private MentorInfo mentorInfo;
    private List<ScheduleInfos> scheduleInfos;

    @Data
    @AllArgsConstructor
    public static class MentorInfo {
        private String name;
        private String companyName;
        private String department;
        private String profileImg;
        private String selfProduce;
        private String fileUrl;
    }

    @Data
    @AllArgsConstructor
    public static class ScheduleInfos {
        private String day;
        private List<ScheduleInfo> schedules;
    }

    @Data
    @AllArgsConstructor
    public static class ScheduleInfo {
        private Long scheduleId;
        private String time;
    }
}




