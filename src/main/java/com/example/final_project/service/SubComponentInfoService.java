package com.example.final_project.service;

import com.example.final_project.dto.CalendarResponseDto;
import com.example.final_project.mapper.AnnualLeaveUsageMapper;
import com.example.final_project.mapper.ProgressBar52hMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@Slf4j
public class SubComponentInfoService {
    private final ProgressBar52hMapper progressBar52hMapper;
    private final AnnualLeaveUsageMapper annualLeaveUsageMapper;
    public CalendarResponseDto SubComponentInfo(String empno){
        return CalendarResponseDto.builder()
                .totalAnnualLeave(annualLeaveUsageMapper.totalAnnualLeave(empno))
                .remainingAnnualLeaveDay(annualLeaveUsageMapper.remainingAnnualLeaveDay(empno))
                .remainingAnnualLeaveTime(annualLeaveUsageMapper.remainingAnnualLeaveTime(empno))
                .attendanceWeek(progressBar52hMapper.attendanceWeek(empno))
                .overtimeWeek(progressBar52hMapper.overtimeWeek(empno))
                .todayWorkTime(progressBar52hMapper.todayWorkTime(empno)).build();
    }
}
