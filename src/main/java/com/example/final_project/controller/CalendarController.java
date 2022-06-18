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

        List<CalendarResponseDto.vacationBuilder> Calendarvacation = calendarMapper.findUserVacation(empno);
        if (Calendarvacation == null || Calendarvacation.isEmpty()) {
            response.sendError(Code.CALENDAR_VACATION_ERROR.getCode());
            return null;
        }

        List<CalendarResponseDto.workBuilder> Calendarwork = calendarMapper.findUserWork(empno);
        if (Calendarwork == null || Calendarwork.isEmpty()) {
            response.sendError(Code.CALENDAR_WORK_ERROR.getCode());
            return null;
        }

        System.out.println(Calendarvacation.size());
        System.out.println(Calendarwork.size());

        for (int i = 0; i < Calendarvacation.size(); i++)
            System.out.println(Calendarvacation.get(i));
        System.out.println();

        for (int i = 0; i < Calendarwork.size(); i++)
            System.out.println(Calendarwork.get(i));

        List<testDto> Calendar = new ArrayList<>();

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);

        return ResponseEntity.ok().headers(headers).body(Calendar);
//        return ResponseEntity.ok().headers(headers).body(dto);
    }
}
