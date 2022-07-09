package com.example.final_project.controller;

import com.example.final_project.dto.ChartListDto;
import com.example.final_project.dto.DeptVacationDto;
import com.example.final_project.dto.DeptVacationStatusDto;
import com.example.final_project.service.DeptVacationService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.List;

@Controller
@RequiredArgsConstructor
public class DeptVacationController {

    private final DeptVacationService deptVacationService;

    @GetMapping("/dvacation")
    public ResponseEntity<List<DeptVacationDto>> deptVacationList(@RequestParam String empno){
        List<DeptVacationDto> dto = deptVacationService.deptVacationList(empno);
        return ResponseEntity.ok().body(dto);
    }

    // 해당 사원이 속한 부서원들의 연차사용 현황
    @GetMapping("/dvacation-status/{empno}")
    public ResponseEntity<List<DeptVacationStatusDto>> getDeptVacationStatus(@PathVariable String empno) {
        List<DeptVacationStatusDto> deptVacationStatus = deptVacationService.getDeptVacationStatus(empno);
        return ResponseEntity.ok().body(deptVacationStatus);
    }

    @GetMapping("/report/dvacation")
    public ResponseEntity<List<ChartListDto>> dVacationList(){
        return ResponseEntity.ok().body(deptVacationService.dVacationList());
    }
}
