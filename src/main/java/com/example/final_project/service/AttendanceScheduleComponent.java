package com.example.final_project.service;

import com.example.final_project.dto.AttendanceCheckDto;
import com.example.final_project.dto.AttendanceUpdateDto;
import com.example.final_project.mapper.AttendanceCheckMapper;
import com.example.final_project.mapper.EmployeeMapper;
import com.example.final_project.model.AttendanceReq;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
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
  //      tardyCheckPerHour();
//        createStatus();
//        checkUnregisteredOff();
   //     log.info("스케줄러");
    }

    @Scheduled(cron="0 0 0/1 * * *")
    public void schedulePerHour(){
        tardyCheckPerHour();
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

    @Transactional
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

    @Transactional
    public void tardyCheckPerHour(){
        //한시간마다 출석하지 않은 직원에 대하여 지각확인
        List<String> empnoList = attendanceCheckMapper.findByNonAttendanceToday();
        for (String empno : empnoList) {
            AttendanceCheckDto attendanceCheckDto = attendanceCheckMapper.tardyCheckPerHour(empno);
            LocalTime onWorkTime;
            if(attendanceCheckDto.getFlexible() == 1){
                onWorkTime = attendanceCheckDto.getGetToWorkTimeSetF().toLocalTime();
            } else{
                onWorkTime = attendanceCheckDto.getGetToWorkTimeSet().toLocalTime();
            }
            if("오전반차".equals(attendanceCheckDto.getReq())){
                onWorkTime = onWorkTime.plusHours(4);
            } else if ("시간연차".equals(attendanceCheckDto.getReq())) {
                AttendanceReq attendanceReq = attendanceCheckMapper.timeVacation(attendanceCheckDto.getEmpno(),LocalDateTime.now());
                if(onWorkTime == attendanceReq.getVacationStart().toLocalTime()){
                    onWorkTime = attendanceReq.getVacationEnd().toLocalTime();
                }
            }
            if (LocalTime.now().isAfter(onWorkTime)){
                log.info(onWorkTime.toString());
                attendanceCheckMapper.updateAttendanceStatus(
                        AttendanceUpdateDto.builder()
                                .empno(empno).date(LocalDate.now()).columns("tardy").values("1").build());
            }
        }
    }

    public void attendanceStatusUpdate(String empno, String column, String value, LocalDate date){
        AttendanceUpdateDto attendanceUpdateDto = AttendanceUpdateDto.builder().empno(empno).columns(column).values(value).date(date).build();
        attendanceCheckMapper.updateAttendanceStatus(attendanceUpdateDto);
    }

    public String getVacationInfo(String empno){
        if (attendanceCheckMapper.vacationCheckTomorrow(empno).isEmpty()){
            return null;
        }else {
            return attendanceCheckMapper.vacationCheckTomorrow(empno).get().getReq();
        }
    }
}
