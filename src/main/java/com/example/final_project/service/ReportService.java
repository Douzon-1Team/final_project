package com.example.final_project.service;

import com.example.final_project.dto.ChartListDto;
import com.example.final_project.dto.DeptVacationStatusDto;
import com.example.final_project.dto.ReportDto;
import com.example.final_project.mapper.EmpInfoCompMapper;
import com.example.final_project.mapper.ReportMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ReportService {
    private final ReportMapper reportMapper;
    private final EmpInfoCompMapper empInfoCompMapper;

    @Transactional
    public List<ReportDto> report(String empno){
        LocalDate date = LocalDate.now();

        List<ReportDto> AttendanceReport = reportMapper.findAttendance(empno);

        List<ReportDto> DeptMemberList = reportMapper.findAllDeptMemberList(empno);

        List<ReportDto> DayWorkList = reportMapper.findDayWork(empno, String.valueOf(date));

        List<ReportDto> DeptAttendance = reportMapper.findAllDeptAttendance();

        AttendanceReport.addAll(DeptMemberList);
        AttendanceReport.addAll(DayWorkList);
        AttendanceReport.addAll(DeptAttendance);

        return AttendanceReport;
    }

    @Transactional
    public List<ChartListDto> attendanceProblemList(String empno){
        String deptNo = empno.substring(2,4);
        List<ChartListDto> dto = reportMapper.findAttendanceProblem(deptNo);

        return dto;
    }

    @Transactional
    public List<ChartListDto> dVacationList(String empno){
        String deptNo = empno.substring(2,4);
        return reportMapper.findDeptVacationHistory(deptNo);
    }

    @Transactional
    public List<DeptVacationStatusDto> getDeptVacationStatus(String empno){
        String deptNo = empInfoCompMapper.findDeptNo(empno);
        List<DeptVacationStatusDto> dto = reportMapper.findDeptVacationStatus(deptNo);
        return dto;
    }
}
