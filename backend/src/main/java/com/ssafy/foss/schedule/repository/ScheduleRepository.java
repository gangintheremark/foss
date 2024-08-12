package com.ssafy.foss.schedule.repository;

import com.ssafy.foss.schedule.domain.Schedule;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

public interface ScheduleRepository extends JpaRepository<Schedule, Long> {
    List<Schedule> findByMemberIdOrderByDateAsc(Long memberId);
    List<Schedule> findByMemberIdAndDateBetweenOrderByDateAsc(Long memberId, LocalDateTime startDate, LocalDateTime endDate);
    List<Schedule> findByDateBetweenOrderByDateAsc(LocalDateTime startDate, LocalDateTime endDate);
    Optional<Schedule> findByMemberIdAndDate(Long memberId, LocalDateTime date);
    @Query("SELECT s FROM Schedule s WHERE s.id IN :ids ORDER BY s.date DESC")
    List<Schedule> findAllByIdOrderByDateAsc(@Param("ids") List<Long> ids);
    List<Schedule> findByDateBefore(LocalDate date);
    void deleteByDateBefore(LocalDate date);
}
