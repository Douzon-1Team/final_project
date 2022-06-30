package com.example.final_project.controller;

import com.example.final_project.dto.DeleteVacationDto;
import com.example.final_project.service.DeleteVacationService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class DeleteVacationListController {

    @Autowired
    private final DeleteVacationService deleteVacationService;

    @PostMapping("/delvacationreq")
    public ResponseEntity delVacation(@RequestBody DeleteVacationDto dto){
        System.out.println(dto.getReqId());

        deleteVacationService.vacation(dto);

        return ResponseEntity.ok().build();
    }
}
