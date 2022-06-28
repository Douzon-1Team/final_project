package com.example.final_project.controller;

import com.example.final_project.dto.DeleteVacationDto;
import com.example.final_project.service.DeleteVacationService;
import com.fasterxml.jackson.core.JsonProcessingException;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class DeleteVacationController {

    private final DeleteVacationService deleteVacationService;

    @PostMapping("/delvacationreq")
    public ResponseEntity deletevacation(@RequestBody DeleteVacationDto dto) throws JsonProcessingException {
        System.out.println(dto.getReqId());

        deleteVacationService.vacation(dto);

        return ResponseEntity.ok().build();
    }

}
