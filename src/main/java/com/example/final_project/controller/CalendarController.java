package com.example.final_project.controller;

import com.example.final_project.dto.CalendarResponseDto;
import com.example.final_project.dto.CalendarResponseDto2;
import com.example.final_project.dto.testDto;
import com.example.final_project.mapper.CalendarMapper;
import com.example.final_project.model.Code;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

@Slf4j
@RestController
@RequiredArgsConstructor
public class CalendarController {

    private final CalendarMapper calendarMapper;

    @GetMapping("/main")
    public ResponseEntity<?> test(@RequestParam(value ="empnos") String empno, HttpServletResponse response) throws IOException {
        System.out.println(empno);


//        List<CalendarResponseDto> test = calendarMapper.findUserVacation(empno);


//        for (int i = 0; i < test.size(); i++) {
//            System.out.println(test.get(i).getEmpno());
//        }
//        for (int i = 0; i < test.)

        List<CalendarResponseDto2> Calendarvaction = calendarMapper.findUserVacation(empno);
        if (Calendarvaction == null || Calendarvaction.isEmpty()) {
            response.sendError(Code.CALENDAR_VACATION_ERROR.getCode());
            return null;
        }
//
        List<CalendarResponseDto> Calendarwork = calendarMapper.findUserWork(empno);
        if (Calendarwork == null || Calendarwork.isEmpty()) {
            response.sendError(Code.CALENDAR_WORK_ERROR.getCode());
            return null;
        }
//        System.out.println(Calendarvaction.size());
//        System.out.println(Calendarwork.size());

        List<testDto> Calendar = new ArrayList<>();

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);

        return ResponseEntity.ok().headers(headers).body(Calendar);
//        return ResponseEntity.ok().headers(headers).body(dto);
    }
}
