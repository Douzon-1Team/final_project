package com.example.final_project.controller;

import com.example.final_project.dto.AcceptAttDto;
import com.example.final_project.service.AcceptAttService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class AcceptAttController {
    @Autowired
    private final AcceptAttService acceptAttService;
    @PostMapping("/acceptatt")
    public ResponseEntity acceptatt(@RequestBody AcceptAttDto dto){
        acceptAttService.acceptatt(dto);
        return ResponseEntity.ok().build();
    }
}
