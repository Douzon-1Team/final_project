package com.example.final_project.controller;

import com.example.final_project.dto.AcceptReqEmpNoDto;
import com.example.final_project.service.AcceptReqEmpNoService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequiredArgsConstructor
public class AcceptReqEmpNoController {
    private final AcceptReqEmpNoService acceptReqEmpNoService;

    @GetMapping("/deptno")
    public ResponseEntity coEmpNo(@RequestParam String empno){
        List<AcceptReqEmpNoDto> dto=acceptReqEmpNoService.coEmpNo(empno);
        return ResponseEntity.ok().body(dto);
    }
}
