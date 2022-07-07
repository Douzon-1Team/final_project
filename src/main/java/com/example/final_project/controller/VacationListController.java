package com.example.final_project.controller;

import com.example.final_project.dto.LeaveListDto;
import com.example.final_project.service.VacationListService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequiredArgsConstructor
public class VacationListController {

    private final VacationListService vacationListService;

    @GetMapping("/vacationlist")
    public ResponseEntity vacationlist(@RequestParam String empno) {
        List<LeaveListDto> dto = vacationListService.vacationlist(empno);
        return ResponseEntity.ok().body(dto);
    }


}
