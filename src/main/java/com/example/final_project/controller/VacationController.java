package com.example.final_project.controller;

import com.example.final_project.dto.VacationRequestDto;
import com.example.final_project.service.VacationService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class VacationController {

    @Autowired
    private final VacationService vacationService;

    @PostMapping("/vacationreq")
    public ResponseEntity vacation(@RequestBody VacationRequestDto dto) {
        System.out.println(dto.getEmpNo());
        System.out.println(dto.getReq());
        System.out.println(dto.getStartFormat());
        System.out.println(dto.getEndFormat());
        System.out.println(dto.getComment());

        vacationService.vacation(dto);

        return ResponseEntity.ok().build();
    }
}
