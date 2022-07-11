package com.example.final_project.controller;

import com.example.final_project.dto.CalendarResponseDto;
import com.example.final_project.dto.DeptVacationDto;
import com.example.final_project.mapper.CalendarMapper;
import com.example.final_project.mapper.MonthChatMapper;
import com.example.final_project.service.CalendarService;
import com.example.final_project.service.SubComponentInfoService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Slf4j
@RestController
@RequiredArgsConstructor
public class CalendarController {

    private final CalendarService calendarService;

    @GetMapping("/main")
    public ResponseEntity<?> maincalendar(@RequestParam("empno") String empno){

        List<CalendarResponseDto> Usermain = calendarService.mainCalendar(empno);

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);

        return ResponseEntity.ok().headers(headers).body(Usermain);
    }

    @GetMapping("/main/dvacation")
    public ResponseEntity<List<DeptVacationDto>> deptVacationList(@RequestParam String empno){
        List<DeptVacationDto> dto = calendarService.deptVacationList(empno);
        return ResponseEntity.ok().body(dto);
    }
}
