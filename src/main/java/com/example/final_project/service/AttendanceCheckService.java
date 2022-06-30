package com.example.final_project.service;

import com.example.final_project.dto.AttendanceCheckDto;
import com.example.final_project.dto.AttendanceUpdateDto;
import com.example.final_project.mapper.AttendanceCheckMapper;
import com.example.final_project.model.AttendanceTime;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.LocalTime;

@Service
@RequiredArgsConstructor
@Slf4j
public class AttendanceCheckService {
    private final AttendanceCheckMapper attendanceCheckMapper;

    public String  onOffWorkCheck(String empno, LocalDateTime now){
        AttendanceCheckDto attendanceCheckDto = attendanceCheckMapper.timeCheck(empno);
        LocalTime onWork;
        LocalTime offWork;
        if(attendanceCheckDto.getFlexible() == 1){
            onWork = attendanceCheckDto.getGetToWorkTimeSetF().toLocalTime();
            offWork = attendanceCheckDto.getGetOffWorkTimeSetF().toLocalTime();
        } else{
            onWork = attendanceCheckDto.getGetToWorkTimeSet().toLocalTime();
            offWork = attendanceCheckDto.getGetOffWorkTimeSet().toLocalTime();
        }
        //휴가 체크해서 출퇴근 시간 바꿔준후 넣기
        //vacationChecker(attendanceCheckDto.getVacation(),onWork,offWork);
        if(attendanceCheckDto.getVacation() == "오전반차"){
            onWork.plusHours(4);
        }
        if(attendanceCheckDto.getVacation() == "오후반차"){
            offWork.minusHours(4);
        }
        return timeCheck(empno, now, onWork, offWork);
    }

    public String timeCheck(String empno, LocalDateTime now, LocalTime onWork, LocalTime offWork){
        LocalTime nowTime = now.toLocalTime();
        if(nowTime.isBefore(onWork) || nowTime.equals(onWork)){
            //정상 출근
            if(attendanceChecker(empno, now, 1)){
                AttendanceUpdateDto attendance = AttendanceUpdateDto.builder().empno(empno).columns("attendance").values("1").build();
                attendanceCheckMapper.attendanceProblem(attendance);
                return "출근";
            }else {
                return "이미 출근하셨습니다";
            }
        } else if (nowTime.isAfter(onWork) && nowTime.isBefore(offWork)) {
            if(attendanceChecker(empno, now, 1)){
                AttendanceUpdateDto attendance = AttendanceUpdateDto.builder().empno(empno).columns("attendance").values("1").build();
                attendanceCheckMapper.attendanceProblem(attendance);
                tardyCheck(nowTime, onWork,empno);
                return "지각입니다.";
            }else {
                return "퇴근시간이 아닙니다.";
            }
        } else if(nowTime.isAfter(offWork) || now.equals(offWork)){
            // 퇴근
            if(attendanceChecker(empno, now, 0)){
                if(unregisteredOn(empno)){
                    return "퇴근(출근 미등록)";
                }else {
                    return "퇴근";
                }
            }else{
                return "이미 퇴근하셨습니다";
            }
        } else {
            return "다시 시도해주세요.";
        }
    }

    public boolean attendanceChecker(String empno, LocalDateTime date, int onOffWork){
        AttendanceTime attendanceTime = AttendanceTime.builder().empno(empno).deptNo(empno.substring(2, 4)).date(date).onOffWork(onOffWork).build();
        if(duplicationCheck(empno,onOffWork)){
            attendanceCheckMapper.attendanceCheck(attendanceTime);
            return true;
        }else {
            return false;
        }
    }

    public boolean duplicationCheck(String empno, int onOffWork){
        if(attendanceCheckMapper.duplicatedCheck(empno, onOffWork).isEmpty()){
            return true;
        }else {
            return false;
        }
    }

    public void tardyCheck(LocalTime nowTime, LocalTime onWork,String empno){
        if(nowTime.isAfter(onWork)){
            AttendanceUpdateDto tardyUpdate = AttendanceUpdateDto.builder().empno(empno).columns("tardy").values("1").build();
            attendanceCheckMapper.attendanceProblem(tardyUpdate);
            AttendanceUpdateDto tardyUpdateEtc = AttendanceUpdateDto.builder().empno(empno).columns("etc").values("지각").build();
            attendanceCheckMapper.attendanceProblem(tardyUpdateEtc);
        }
    }

    public boolean unregisteredOn(String empno){
        if(duplicationCheck(empno, 1)){
            AttendanceUpdateDto unregisteredOnEtc = AttendanceUpdateDto.builder().empno(empno).columns("etc").values("출근미등록").build();
            attendanceCheckMapper.attendanceProblem(unregisteredOnEtc);
            return true;
        }else {
            return false;
        }
    }

/*    public void vacationChecker(String vacation,LocalTime onWork, LocalTime offWork){
        if(vacation == "휴가"){

        } else if(vacation == "오전반차"){
            onWork.plusHours(4);
        } else if (vacation == "오후반차") {

        }
    }*/

    public void lunchCheck(){

    }




}
