package com.example.final_project.controller;

import com.example.final_project.dto.ProgressBar52hDto;
import com.example.final_project.service.ProgressBar52hService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@Slf4j
@RestController
@RequiredArgsConstructor
public class ProgressBar52hController {
    private final ProgressBar52hService progressBar52hService;

    @PostMapping("/progressTest")
    public ResponseEntity<?> mainPageComponent(@RequestBody String empno) throws Exception{

        ProgressBar52hDto dto = progressBar52hService.getPb52Mapper(empno);

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);

        return ResponseEntity.ok().headers(headers).body(dto);
    }

}
