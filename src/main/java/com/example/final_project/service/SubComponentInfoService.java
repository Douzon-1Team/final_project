package com.example.final_project.service;

import com.example.final_project.dto.CalendarResponseDto;
import com.example.final_project.mapper.SubComponentMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@Slf4j
public class SubComponentInfoService {
    private final SubComponentMapper subComponentMapper;
    public CalendarResponseDto SubComponentInfo(String empno){
        return CalendarResponseDto.builder()
                .totalAnnualLeave(subComponentMapper.totalAnnualLeave(empno))
                .remainingAnnualLeaveDay(subComponentMapper.remainingAnnualLeaveDay(empno))
                .remainingAnnualLeaveTime(subComponentMapper.remainingAnnualLeaveTime(empno))
                .attendanceWeek(subComponentMapper.attendanceWeek(empno))
                .overtimeWeek(subComponentMapper.overtimeWeek(empno))
                .todayWorkTime(subComponentMapper.todayWorkTime(empno))
                .attendanceCount(subComponentMapper.attendanceCount(empno))
                .tardyCount(subComponentMapper.tardyCount(empno))
                .absenteeismCount(subComponentMapper.absenteeismCount(empno))
                .vacationCount(subComponentMapper.vacationCount(empno)).build();
    }
}
