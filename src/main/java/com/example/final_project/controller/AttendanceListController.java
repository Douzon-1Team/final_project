package com.example.final_project.controller;

import com.example.final_project.dto.AttendanceListDto;
import com.example.final_project.service.AttendanceListService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequiredArgsConstructor
public class AttendanceListController {
    private final AttendanceListService attendanceListService;

    @GetMapping("/attendancelist")
    public ResponseEntity attendancelist(@RequestParam String empno) {
        List<AttendanceListDto> dto = attendanceListService.attendancelist(empno);
        return ResponseEntity.ok().body(dto);
    }
}
