package com.example.final_project.controller;

import com.example.final_project.dto.ReportDto;
import com.example.final_project.mapper.ReportMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequiredArgsConstructor
public class ReportController {

    private final ReportMapper reportMapper;

    @GetMapping("/report")
    public ResponseEntity<?> Report(@RequestParam("empno") String empno) {

        List<ReportDto> Attendancereport = reportMapper.findAttendance(empno);

        List<ReportDto> DeptMemberList = reportMapper.findAllDeptMemberList(empno);

        List<ReportDto> DayWorkList = reportMapper.findDayWork(empno);

        List<ReportDto> DeptAttendance = reportMapper.findAllDeptAttendance();

        Attendancereport.addAll(DeptMemberList);
        Attendancereport.addAll(DayWorkList);
        Attendancereport.addAll(DeptAttendance);

        return ResponseEntity.ok().body(Attendancereport);
    }
}
