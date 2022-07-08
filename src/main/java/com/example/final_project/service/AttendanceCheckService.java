package com.example.final_project.service;

import com.example.final_project.dto.AttendanceCheckDto;
import com.example.final_project.dto.AttendanceUpdateDto;
import com.example.final_project.mapper.AttendanceCheckMapper;
import com.example.final_project.mapper.EmployeeMapper;
import com.example.final_project.mapper.SubComponentMapper;
import com.example.final_project.model.AttendanceReq;
import com.example.final_project.model.AttendanceTime;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;

@Service
@RequiredArgsConstructor
@Slf4j
public class AttendanceCheckService {
    private final AttendanceCheckMapper attendanceCheckMapper;
    private final SubComponentMapper subComponentMapper;
    private final EmployeeMapper employeeMapper;

    public String  onOffWorkCheck(String empno, LocalDateTime now){
        AttendanceCheckDto attendanceCheckDto = attendanceCheckMapper.timeCheck(empno,now);
        LocalTime onWork = onWorkTimeCheck(attendanceCheckDto);
        LocalTime offWork = offWorkTimeCheck(attendanceCheckDto);
        String msg = employeeMapper.findNameByempno(empno) + "(" + empno + ")님 " + timeCheck(empno, now, onWork, offWork);
        return msg;
    }

    public LocalTime onWorkTimeCheck(AttendanceCheckDto attendanceCheckDto){
        LocalTime onWorkTime;
        if(attendanceCheckDto.getFlexible() == 1){
            onWorkTime = attendanceCheckDto.getGetToWorkTimeSetF().toLocalTime();
        } else{
            onWorkTime = attendanceCheckDto.getGetToWorkTimeSet().toLocalTime();
        }
        if("오전반차".equals(attendanceCheckDto.getReq())){
            onWorkTime = onWorkTime.plusHours(4);
        } else if ("시간연차".equals(attendanceCheckDto.getReq())) {
            AttendanceReq attendanceReq = attendanceCheckMapper.timeVacation(attendanceCheckDto.getEmpno(),attendanceCheckDto.getDate());
            if(onWorkTime == attendanceReq.getVacationStart().toLocalTime()){
                onWorkTime = attendanceReq.getVacationEnd().toLocalTime();
            }
        }
        return lunchCheck(onWorkTime,1);
    }

    public LocalTime offWorkTimeCheck(AttendanceCheckDto attendanceCheckDto){
        LocalTime offWorkTime;
        if(attendanceCheckDto.getFlexible() == 1){
            offWorkTime = attendanceCheckDto.getGetOffWorkTimeSetF().toLocalTime();
        } else{
            offWorkTime = attendanceCheckDto.getGetOffWorkTimeSet().toLocalTime();
        }
        if("오후반차".equals(attendanceCheckDto.getReq())){
            log.info("오후반차 확인");
            offWorkTime = offWorkTime.minusHours(4);
        } else if ("시간연차".equals(attendanceCheckDto.getReq())) {
            AttendanceReq attendanceReq = attendanceCheckMapper.timeVacation(attendanceCheckDto.getEmpno(),attendanceCheckDto.getDate());
            if(offWorkTime == attendanceReq.getVacationEnd().toLocalTime()){
                offWorkTime = attendanceReq.getVacationStart().toLocalTime();
            }
        }
        return lunchCheck(offWorkTime,0);
    }

    public String timeCheck(String empno, LocalDateTime now, LocalTime onWork, LocalTime offWork){
        LocalTime nowTime = now.toLocalTime();
        LocalDate nowDate = now.toLocalDate();
        LocalTime resetTime = LocalTime.of(5,0,0);
        if(nowTime.isBefore(resetTime)){
            return "출근시간이 아닙니다.";
        } else if(nowTime.isBefore(onWork) || nowTime.equals(onWork)){
            //정상 출근
            if(attendanceChecker(empno, now, 1)){
                AttendanceUpdateDto attendance = AttendanceUpdateDto.builder().empno(empno).columns("attendance").values("1").date(nowDate).build();
                attendanceCheckMapper.updateAttendanceStatus(attendance);
                return "출근하셨습니다.";
            }else {
                return "이미 출근하셨습니다.";
            }
        } else if (nowTime.isAfter(onWork) && nowTime.isBefore(offWork)) {
            if(attendanceChecker(empno, now, 1)){
                AttendanceUpdateDto attendance = AttendanceUpdateDto.builder().empno(empno).columns("attendance").values("1").date(nowDate).build();
                attendanceCheckMapper.updateAttendanceStatus(attendance);
                tardyCheck(nowDate, nowTime, onWork, empno);
                return "지각입니다.";
            }else {
                log.info(offWork.toString());
                return "퇴근시간이 아닙니다.";
            }
        } else if(nowTime.isAfter(offWork) || nowTime.equals(offWork)){
            // 퇴근
            if(attendanceChecker(empno, now, 0)){
                if(checkUnregisteredOn(empno, nowDate)){
                    return "퇴근하셨습니다.(출근 미등록)";
                }else {
                    return "퇴근하셨습니다.";
                }
            }else{
                return "이미 퇴근하셨습니다.";
            }
        } else {
            return "다시 시도해주세요.";
        }
    }

    public boolean attendanceChecker(String empno, LocalDateTime date, int onOffWork){
        AttendanceTime attendanceTime = AttendanceTime.builder().empno(empno).deptNo(empno.substring(2, 4)).date(date).time(todayWorkTime(empno,onOffWork)).onOffWork(onOffWork).build();
        if(attendanceCheckMapper.findAttendanceTimeByEmpno(empno, onOffWork, date).isEmpty()){
            attendanceCheckMapper.attendanceCheck(attendanceTime);
            return true;
        }else {
            return false;
        }
    }

    public Long todayWorkTime(String empno, int onOffWork){
        if(onOffWork==0){
            return subComponentMapper.todayWorkTime(empno);
        }else {
            return null;
        }
    }

    public void tardyCheck(LocalDate nowDate, LocalTime nowTime, LocalTime onWork,String empno){
        if(nowTime.isAfter(onWork)){
            AttendanceUpdateDto tardyUpdate = AttendanceUpdateDto.builder().empno(empno).columns("tardy").values("1").date(nowDate).build();
            attendanceCheckMapper.updateAttendanceStatus(tardyUpdate);
            AttendanceUpdateDto tardyUpdateEtc = AttendanceUpdateDto.builder().empno(empno).columns("etc").values("지각").date(nowDate).build();
            attendanceCheckMapper.updateAttendanceStatus(tardyUpdateEtc);
        }
    }

    public boolean checkUnregisteredOn(String empno, LocalDate nowDate){
        if(attendanceCheckMapper.findAttendanceTimeByEmpno(empno, 1,nowDate.atTime(0,0,0)).isEmpty()){
            AttendanceUpdateDto unregisteredOnEtc = AttendanceUpdateDto.builder().empno(empno).columns("etc").values("출근미등록").date(nowDate).build();
            attendanceCheckMapper.updateAttendanceStatus(unregisteredOnEtc);
            return true;
        }else {
            return false;
        }
    }

    public LocalTime lunchCheck(LocalTime time, int flag){
        if(flag==1){
            if(13 <= time.getHour()&& time.getHour() <= 14){
                return LocalTime.of(14,0,0);
            }else {
                return time;
            }
        }else {
            if(13 <= time.getHour()&& time.getHour() <= 14){
                return LocalTime.of(13,0,0);
            }else {
                return time;
            }
        }

    }

}
