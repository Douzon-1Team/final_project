package com.example.final_project.service;

import com.example.final_project.dto.ProgressBar52hDto;
import com.example.final_project.mapper.ProgressBar52hMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ProgressBar52hService {
    private final ProgressBar52hMapper pb52Mapper;

    public ProgressBar52hDto getPb52Mapper(String empno) {
        return ProgressBar52hDto.builder()
                .attendanceWeek(pb52Mapper.attendanceWeek(empno))
                .overtimeWeek(pb52Mapper.overtimeWeek(empno))
                .todayWorkTime(pb52Mapper.todayWorkTime(empno))
                .build();
    }
}
