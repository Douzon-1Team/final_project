package com.example.final_project.controller;

import com.example.final_project.dto.ChartListDto;
import com.example.final_project.dto.DeptVacationStatusDto;
import com.example.final_project.dto.ReportDto;
import com.example.final_project.mapper.ReportMapper;
import com.example.final_project.service.ReportService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequiredArgsConstructor
public class ReportController {

    private final ReportService reportService;

    @GetMapping("/report")
    public ResponseEntity<?> report(@RequestParam("empno") String empno) {
        List<ReportDto> AttendanceReport = reportService.report(empno);
        return ResponseEntity.ok().body(AttendanceReport);
    }

    @GetMapping("/report/list")
    public ResponseEntity<List<ChartListDto>> attendanceProblemList(@RequestParam String empno){
        List<ChartListDto> dto = reportService.attendanceProblemList(empno);
        return ResponseEntity.ok().body(dto);
    }

    @GetMapping("/report/dvacation")
    public ResponseEntity<List<ChartListDto>> dVacationList(@RequestParam String empno){
        return ResponseEntity.ok().body(reportService.dVacationList(empno));
    }

    @GetMapping("/report/dvacation-status")
    public ResponseEntity<List<DeptVacationStatusDto>> getDeptVacationStatus(@RequestParam String empno) {
        List<DeptVacationStatusDto> deptVacationStatus = reportService.getDeptVacationStatus(empno);
        return ResponseEntity.ok().body(deptVacationStatus);
    }
}
