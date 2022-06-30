package com.example.final_project.controller;

import com.example.final_project.dto.DeleteAttendanceDto;
import com.example.final_project.service.DeleteAttendanceService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class DeleteAttendanceListController {
    @Autowired
    private final DeleteAttendanceService deleteAttendanceService;

    @PostMapping("/delattendancereq")
    public ResponseEntity delAttendance(@RequestBody DeleteAttendanceDto dto){
        System.out.println(dto.getReqId());
        deleteAttendanceService.attendance(dto);
        return ResponseEntity.ok().build();
    }
}
