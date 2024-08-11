package com.ssafy.foss.schedule.component;

import com.ssafy.foss.apply.repository.ApplyRepository;
import com.ssafy.foss.apply.service.ApplyService;
import com.ssafy.foss.schedule.domain.Schedule;
import com.ssafy.foss.schedule.repository.ApplyRepository;
import com.ssafy.foss.schedule.repository.ScheduleRepository;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.time.LocalDate;
import java.util.List;

@Component
@RequiredArgsConstructor
public class ScheduleCleanupTask {

    private ScheduleRepository scheduleRepository; // Schedule 엔티티와 연결된 Repository
    private ApplyService applyService;
    @Scheduled(cron = "0 0 6 * * ?")
    public void cleanUpOldSchedules() {
        LocalDate today = LocalDate.now();

        List<Schedule> schedulesToDelete = scheduleRepository.findByDateBefore(today.plusDays(1));

        schedulesToDelete.forEach(schedule -> {
            applyService.deleteByScheduleId(schedule.getId());
            scheduleRepository.delete(schedule);
        });
    }
}


