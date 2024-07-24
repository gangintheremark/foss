package com.ssafy.foss.util;

import com.ssafy.foss.schedule.exception.InvalidMonthException;

import java.time.LocalDate;
import java.time.LocalDateTime;

public class DateUtil {
    public static void validateMonth(int month) {
        if (month < 1 || month > 12) {
            throw new InvalidMonthException("Invalid month: " + month);
        }
    }

    public static LocalDateTime getStartDate(int month) {
        int currentYear = LocalDate.now().getYear();
        return LocalDateTime.of(currentYear, month, 1, 0, 0);
    }

    public static LocalDateTime getEndDate(LocalDateTime startDate, int month) {
        if (month == 12) {
            return LocalDateTime.of(startDate.getYear() + 1, 2, 1, 0, 0);
        } else {
            return startDate.plusMonths(2);
        }
    }
}
