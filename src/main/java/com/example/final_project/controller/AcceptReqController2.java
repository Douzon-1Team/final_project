package com.example.final_project.controller;

import com.example.final_project.dto.AcceptReqDto2;
import com.example.final_project.service.AcceptReqService2;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class AcceptReqController2 {
    @Autowired
    private final AcceptReqService2 acceptReqService2;
    @PostMapping("/acceptreq2")
    public ResponseEntity acceptreq2(@RequestBody AcceptReqDto2 dto){
        acceptReqService2.acceptreq2(dto);
        return ResponseEntity.ok().build();
    }
}
