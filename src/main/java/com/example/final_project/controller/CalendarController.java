package com.example.final_project.controller;

import com.example.final_project.dto.CalendarResponseDto;
import com.example.final_project.exception.ErrorCode;
import com.example.final_project.mapper.AnnualLeaveUsageMapper;
import com.example.final_project.mapper.CalendarMapper;
import com.example.final_project.mapper.ProgressBar52hMapper;
import com.example.final_project.service.SubComponentInfoService;
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
    private final SubComponentInfoService subComponentInfoService;

    @GetMapping("/main")

    public ResponseEntity<?> test(@RequestParam("empnos") String empno, HttpServletResponse response) throws IOException {

        System.out.println(empno);
//        List<CalendarResponseDto.vacationBuilder> Calendarvacation = calendarMapper.findUserVacation(empno);
        List<CalendarResponseDto> Calendarvacation = calendarMapper.findUserVacation(empno);
        if (Calendarvacation == null || Calendarvacation.isEmpty()) {
            response.sendError(ErrorCode.CALENDAR_VACATION_ERROR.getCode());
            return null;
        }

//        List<CalendarResponseDto.workBuilder> Calendarwork = calendarMapper.findUserWork(empno);
        List<CalendarResponseDto> Calendarwork = calendarMapper.findUserWork(empno);
        if (Calendarwork == null || Calendarwork.isEmpty()) {
            response.sendError(ErrorCode.CALENDAR_WORK_ERROR.getCode());
            return null;
        }

        CalendarResponseDto SubComponentInfo = subComponentInfoService.SubComponentInfo(empno);

        List<CalendarResponseDto> Calendar = new ArrayList<>();
        Calendar.add(SubComponentInfo);
        Calendar.addAll(Calendarvacation);
        Calendar.addAll(Calendarwork);

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);

        return ResponseEntity.ok().headers(headers).body(Calendar);
    }
}
