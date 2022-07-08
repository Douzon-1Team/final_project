package com.example.final_project.controller;

import com.example.final_project.dto.RejectReqDto;
import com.example.final_project.service.RejectReqService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class RejectReqController {
    @Autowired
    private final RejectReqService rejectReqService;
    @PostMapping("/rejectreq")
    public ResponseEntity rejectreq(@RequestBody RejectReqDto dto){
        rejectReqService.rejectreq(dto);
        return ResponseEntity.ok().build();
    }
}
