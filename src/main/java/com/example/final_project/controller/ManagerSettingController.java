package com.example.final_project.controller;

import com.example.final_project.dto.ManagerSettingDto;
import com.example.final_project.service.ManagerSettingService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
public class ManagerSettingController {

    private final ManagerSettingService managerSettingService;

    @GetMapping("/setting/{empno}")
    public ResponseEntity<ManagerSettingDto> getWorkTime(@PathVariable String empno){
        System.out.println(empno);
        ManagerSettingDto managerSettingDto = managerSettingService.getWorkTime(empno);
        return ResponseEntity.ok().body(managerSettingDto);
    }

    // 1. 근무(출/퇴근)시간 설정
    @PostMapping("/setting/time")
    public ResponseEntity updateWorkTime(@RequestBody ManagerSettingDto managerSettingDto) {
        managerSettingService.updateWorkTime(managerSettingDto);
        return ResponseEntity.ok().build();
    }

    // 2. 페이지 보여주기 방식(차트/목록)
    @PostMapping("/setting/graph")
    public ResponseEntity updateGraph(@RequestBody ManagerSettingDto managerSettingDto) {
        managerSettingService.updateGraph(managerSettingDto);
        return ResponseEntity.ok().build();
    }
}
