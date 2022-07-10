package com.example.final_project.controller;

import com.example.final_project.dto.AcceptReqDto;
import com.example.final_project.dto.AcceptReqDto2;
import com.example.final_project.service.AcceptReqService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class AcceptReqController {

    private final AcceptReqService acceptReqService;

    @PostMapping("/accept/vacation")
    public ResponseEntity acceptVacation(@RequestBody AcceptReqDto dto){
        acceptReqService.acceptVacation(dto);
        return ResponseEntity.ok().build();
    }

    @PostMapping("/accept/attendance")
    public ResponseEntity acceptAttendance(@RequestBody AcceptReqDto2 dto){
        acceptReqService.acceptAttendance(dto);
        return ResponseEntity.ok().build();
    }
}
