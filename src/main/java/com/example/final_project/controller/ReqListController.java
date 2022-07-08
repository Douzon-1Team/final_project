package com.example.final_project.controller;

import com.example.final_project.dto.ReqListDto;
import com.example.final_project.service.ReqListService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequiredArgsConstructor
public class ReqListController {
    private final ReqListService reqListService;
    @GetMapping("/reqlist")
    public ResponseEntity reqlist(@RequestParam  String empno){
        List<ReqListDto> dto=reqListService.reqlist(empno);
        return ResponseEntity.ok().body(dto);
    }
}
