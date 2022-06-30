package com.example.final_project.service;

import com.example.final_project.dto.AttendanceCheckDto;
import com.example.final_project.dto.AttendanceUpdateDto;
import com.example.final_project.mapper.AttendanceCheckMapper;
import com.example.final_project.mapper.EmployeeMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Component
@RequiredArgsConstructor
@Slf4j
public class AttendanceStatusCreatService {

    private final AttendanceCheckMapper attendanceCheckMapper;
    private final EmployeeMapper employeeMapper;

    @Scheduled(cron="0 43 21 * * ?")
    public void scheduleRunner(){
        createStatus();
        checkUnregisteredOff();
        log.info("스케줄러");
    }
    @Scheduled(cron="0/10 * * * * *")
    public void cheduledTest(){
//        createStatus();
//        checkUnregisteredOff();
//        log.info("스케줄러");
    }

    public void createStatus(){
        List<String> empnoList = employeeMapper.findAllEmpNo();
        LocalDateTime date = LocalDate.now().atTime(0, 0,0,0).plusDays(1);
        for (String empno : empnoList) {
            String etc = getVacationInfo(empno);
            AttendanceCheckDto attendanceCheckDto = AttendanceCheckDto.builder().empno(empno).deptNo(empno.substring(2, 4)).etc(etc).date(date).build();
            attendanceCheckMapper.attendanceStatusCreate(attendanceCheckDto);
        }
    }

    public void checkUnregisteredOff(){
        List<String> empnoList = employeeMapper.findAllEmpNo();
        LocalDate yesterday = LocalDate.now().minusDays(1);
        for (String empno : empnoList) {
            String vacationCheckFlag;
            if(attendanceCheckMapper.findByEmpno(empno,yesterday).isEmpty()){
                vacationCheckFlag = "";
            }else {
                vacationCheckFlag = attendanceCheckMapper.findByEmpno(empno,yesterday).get().getEtc();
                //log.info(empno + " : " + vacationCheckFlag);
            }

            if(!"휴가".equals(vacationCheckFlag) && !"결근".equals(vacationCheckFlag) ){
                if(attendanceCheckMapper.unregisteredOffCheck(empno).isEmpty()){
                    AttendanceUpdateDto attendanceUpdateDto = AttendanceUpdateDto.builder().empno(empno).columns("unregistered").values("1").date(yesterday).build();
                    attendanceCheckMapper.updateAttendanceStatus(attendanceUpdateDto);
                }
            }
        }
    }

    public String getVacationInfo(String empno){
        if (attendanceCheckMapper.VacationCheck(empno).isEmpty()){
            return null;
        }else {
            return attendanceCheckMapper.VacationCheck(empno).get().getReq();
        }
    }
}
