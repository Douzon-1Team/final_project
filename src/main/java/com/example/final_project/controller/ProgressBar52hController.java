package com.example.final_project.controller;

import com.example.final_project.dto.ProgressBar52hDto;
import com.example.final_project.dto.testEmpNoDto;
import com.example.final_project.mapper.ProgressBar52hMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletResponse;

@Slf4j
@RestController
@RequiredArgsConstructor
public class ProgressBar52hController {
    private final ProgressBar52hMapper progressBar52hMapper;

    @PostMapping("/progressTest")
    public ResponseEntity<?> mainPageComponent(@RequestBody String test) throws Exception{

        Long attendanceWeek = progressBar52hMapper.attendanceWeek(test);
        Long overtimeWeek = progressBar52hMapper.overtimeWeek(test);
        Long todayWorkTime = progressBar52hMapper.todayWorkTime(test);

        ProgressBar52hDto dto = ProgressBar52hDto.builder()
                .attendanceWeek(attendanceWeek)
                .overtimeWeek(overtimeWeek)
                .todayWorkTime(todayWorkTime)
                .build();

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);

        return ResponseEntity.ok().headers(headers).body(dto);
    }

}
