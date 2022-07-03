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
public class AttendanceScheduleComponent {

    private final AttendanceCheckMapper attendanceCheckMapper;
    private final EmployeeMapper employeeMapper;

    @Scheduled(cron = "0 55 23 * * ?")
    public void scheduleTomorrow(){
//        createStatus();
//        log.info("내일 스테이터스 등록");
    }
    @Scheduled(cron = "1 0 0 * * ?")
    public void scheduleYesterday(){
//        checkUnregisteredOff();
//        log.info("이상근태 점검");
    }
    @Scheduled(cron="0/10 * * * * *")
    public void scheduledTest(){
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
                vacationCheckFlag = null;
            }else {
                vacationCheckFlag = attendanceCheckMapper.findByEmpno(empno,yesterday).get().getEtc();
            }
            if(!"휴가".equals(vacationCheckFlag)){
                if(attendanceCheckMapper.unregisteredOffCheck(empno,0).isEmpty()){
                    if(attendanceCheckMapper.unregisteredOffCheck(empno,1).isEmpty()) {
                        //결근 처리
                        attendanceStatusUpdate(empno,"etc","결근",yesterday);
                    }else {
                        //퇴근 미등록 처리
                        attendanceStatusUpdate(empno,"unregistered","1",yesterday);
                    }
                }
            }
        }
    }
    public void tardyCheckPerTime(){
        //한시간마다 출석하지 않은 직원에 대하여 지각확인
    }

    public void attendanceStatusUpdate(String empno, String column, String value, LocalDate date){
        AttendanceUpdateDto attendanceUpdateDto = AttendanceUpdateDto.builder().empno(empno).columns(column).values(value).date(date).build();
        attendanceCheckMapper.updateAttendanceStatus(attendanceUpdateDto);
    }

    public String getVacationInfo(String empno){
        if (attendanceCheckMapper.VacationCheck(empno).isEmpty()){
            return null;
        }else {
            return attendanceCheckMapper.VacationCheck(empno).get().getReq();
        }
    }
}
