package com.example.final_project.controller;

import com.example.final_project.dto.AcceptReqDto;
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
    @Autowired
    private final AcceptReqService acceptReqService;
    @PostMapping("/acceptreq")
    public ResponseEntity acceptreq(@RequestBody AcceptReqDto dto){
        acceptReqService.acceptreq(dto);
        return ResponseEntity.ok().build();
    }
}
