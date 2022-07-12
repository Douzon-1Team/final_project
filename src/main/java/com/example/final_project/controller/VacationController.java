package com.example.final_project.controller;

import com.example.final_project.dto.DeleteVacationDto;
import com.example.final_project.dto.LeaveListDto;
import com.example.final_project.dto.VacationRequestDto;
import com.example.final_project.dto.getVacationDataDto;
import com.example.final_project.service.VacationService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
public class VacationController {

    private final VacationService vacationService;

    @GetMapping("/vacation/list")
    public ResponseEntity vacationlist(@RequestParam String empno) {
        List<LeaveListDto> dto = vacationService.vacationlist(empno);
        return ResponseEntity.ok().body(dto);
    }

    @PostMapping("/vacation/req")
    public ResponseEntity vacation(@RequestBody VacationRequestDto dto) {
        vacationService.vacation(dto);

        return ResponseEntity.ok().build();
    }

    @PostMapping("/vacation/delete")
    public ResponseEntity delVacation(@RequestBody DeleteVacationDto dto){
        vacationService.vacation(dto);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/vacation/data")
    public ResponseEntity getVacationData(@RequestParam String empNo){
        List<getVacationDataDto> dto = vacationService.getvacationdata(empNo);
        return ResponseEntity.ok().body(dto);
    }
}
