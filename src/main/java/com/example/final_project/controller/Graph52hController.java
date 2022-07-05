package com.example.final_project.controller;

import com.example.final_project.service.Graph52hService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@RestController
@RequiredArgsConstructor
public class Graph52hController {
    private final Graph52hService graph52hService;
    @GetMapping("/graph52h")
    public ResponseEntity<?> graph52h(@RequestParam("empno") String empno){
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        log.info(empno);
        return ResponseEntity.ok().headers(headers).body(graph52hService.graph52h(empno));
    }
}
