package com.example.final_project.service;

import com.example.final_project.dto.AttendanceListDto;
import com.example.final_project.mapper.AttendanceListMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class AttendanceListService {
    private final AttendanceListMapper attendanceListMapper;
    public List<AttendanceListDto> attendancelist(String empno){
        return attendanceListMapper.readAttendanceList(empno);
    }
}
