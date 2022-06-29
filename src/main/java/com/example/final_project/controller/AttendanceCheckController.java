package com.example.final_project.controller;

import com.example.final_project.service.AttendanceCheckService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;
import javax.servlet.http.HttpServletRequest;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;


@Slf4j
@RestController
@RequiredArgsConstructor
public class AttendanceCheckController {

    private final AttendanceCheckService attendanceCheckService;

    @RequestMapping(value = "/attendanceCheck", method = RequestMethod.POST)
    public String postTest(HttpServletRequest request){
        String empno = request.getParameter("empno");
        String strDate = request.getParameter("time");
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
        LocalDateTime date = LocalDateTime.parse(strDate, formatter);

        return attendanceCheckService.onOffWorkCheck(empno, date);
    }
}
