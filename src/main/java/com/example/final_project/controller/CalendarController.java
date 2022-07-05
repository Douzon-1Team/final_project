package com.example.final_project.controller;

import com.example.final_project.dto.CalendarResponseDto;
import com.example.final_project.mapper.CalendarMapper;
import com.example.final_project.mapper.MonthChatMapper;
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

    private final CalendarMapper calendarMapper;
    private final SubComponentInfoService subComponentInfoService;
    private final MonthChatMapper monthChatMapper;

    @GetMapping("/main")
    public ResponseEntity<?> maincalendar(@RequestParam("empno") String empno, HttpServletResponse response) throws IOException {
        System.out.println(empno);
        LocalDate now = LocalDate.now();
        String year = String.valueOf(now.getYear());
        // TODO : 달력으로부터 올해 날짜 받아오게
        System.out.println(year);

        List<CalendarResponseDto> Calendarwork = calendarMapper.findUserVacation(empno);

        List<CalendarResponseDto> Calendarnotwork = calendarMapper.findUserNotWork(empno);

        List<CalendarResponseDto> Calendarvacation = calendarMapper.findUserWork(empno);

        List<CalendarResponseDto> Monthdate = monthChatMapper.findWorkDate(year, empno);

        List<CalendarResponseDto> Vacation = monthChatMapper.findVacationDate(year, empno);

        List<CalendarResponseDto> Nonwork = monthChatMapper.findNonWorkDate(year, empno);

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);


        CalendarResponseDto SubComponentInfo = subComponentInfoService.SubComponentInfo(empno);

        List<CalendarResponseDto> Usermain = new ArrayList<>();
        Usermain.add(SubComponentInfo);
        Usermain.addAll(Calendarvacation);
        Usermain.addAll(Calendarwork);
        Usermain.addAll(Calendarnotwork);
        Usermain.addAll(Monthdate);
        Usermain.addAll(Vacation);
        Usermain.addAll(Nonwork);


        return ResponseEntity.ok().headers(headers).body(Usermain);
    }
}
