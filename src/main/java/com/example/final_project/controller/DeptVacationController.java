package com.example.final_project.controller;

import com.example.final_project.dto.DeptVacationDto;
import com.example.final_project.service.DeptVacationService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
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
}
