package com.example.final_project.service;

import com.example.final_project.dto.CalendarResponseDto;
import com.example.final_project.dto.DeptVacationDto;
import com.example.final_project.exception.EmpException;
import com.example.final_project.exception.ErrorCode;
import com.example.final_project.mapper.CalendarMapper;
import com.example.final_project.mapper.DeptVacationMapper;
import com.example.final_project.mapper.EmployeeMapper;
import com.example.final_project.mapper.MonthChatMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class CalendarService {

    private final CalendarMapper calendarMapper;
    private final MonthChatMapper monthChatMapper;
    private final DeptVacationMapper deptVacationMapper;
    private final EmployeeMapper employeeMapper;
    private final SubComponentInfoService subComponentInfoService;

    @Transactional
    public List<CalendarResponseDto> mainCalendar(String empno){
        LocalDate now = LocalDate.now();
        String year = String.valueOf(now.getYear());

        List<CalendarResponseDto> Calendarwork = calendarMapper.findUserVacation(empno);
        List<CalendarResponseDto> Calendarnotwork = calendarMapper.findUserNotWork(empno);
        List<CalendarResponseDto> Calendarvacation = calendarMapper.findUserWork(empno);
        List<CalendarResponseDto> Monthdate = monthChatMapper.findWorkDate(year, empno);
        List<CalendarResponseDto> Vacation = monthChatMapper.findVacationDate(year, empno);
        List<CalendarResponseDto> Nonwork = monthChatMapper.findNonWorkDate(year, empno);

        CalendarResponseDto SubComponentInfo = subComponentInfoService.SubComponentInfo(empno);

        List<CalendarResponseDto> Usermain = new ArrayList<>();
        Usermain.add(SubComponentInfo);
        Usermain.addAll(Calendarvacation);
        Usermain.addAll(Calendarwork);
        Usermain.addAll(Calendarnotwork);
        Usermain.addAll(Monthdate);
        Usermain.addAll(Vacation);
        Usermain.addAll(Nonwork);

        return Usermain;
    }


    @Transactional
    public List<DeptVacationDto> deptVacationList(String empno){
        employeeMapper.findByUserId(empno)
                .orElseThrow(() -> new EmpException(ErrorCode.EMP_NOTFOUND));
        return deptVacationMapper.findDeptVacationList(empno);
    }
}
