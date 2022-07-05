package com.example.final_project;

import com.example.final_project.mapper.AttendanceCheckMapper;
import com.example.final_project.model.AttendanceStatus;
import com.example.final_project.model.AttendanceTime;
import com.example.final_project.service.AttendanceCheckService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mybatis.spring.boot.test.autoconfigure.MybatisTest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.test.context.junit.jupiter.SpringExtension;

import static org.assertj.core.api.Assertions.*;

import java.time.LocalDate;
import java.time.LocalDateTime;

@MybatisTest
@ExtendWith(SpringExtension.class)
@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.NONE) // 실제 DB 연결 테스트
public class AttendanceCheckCaseTest {

    @Autowired
    AttendanceCheckMapper attendanceCheckMapper;
    AttendanceCheckService attendanceCheckService;
    @BeforeEach
    void init(){
        attendanceCheckService = new AttendanceCheckService(attendanceCheckMapper);
    }

    @Test
    @DisplayName("정상출근")
    public void onWorkNormalTest() throws Exception {
        //given
        String empno = "220109";
        int onOffWork = 1;
        LocalDateTime normal = LocalDate.now().atTime(8, 59,59,0);

        //when
        String normalMsg = attendanceCheckService.onOffWorkCheck(empno, normal);
        AttendanceTime attendanceTime = attendanceCheckMapper.findAttendanceTimeByEmpno(empno, onOffWork).get();
        AttendanceStatus attendanceStatus = attendanceCheckMapper.findByEmpno(empno, LocalDate.now()).get();

        //then
        assertThat(attendanceTime.getDate()).isEqualTo(normal);
        assertThat(attendanceStatus.getDate().toLocalDate()).isEqualTo(LocalDate.now());
        assertThat(attendanceStatus.getAttendance()).isEqualTo(1);
        assertThat(normalMsg).isEqualTo("출근");
    }

    @Test
    @DisplayName("중복출근")
    public void onWorkDuplicateTest() throws Exception {
        //given
        String empno = "220109";
        int onOffWork = 1;
        LocalDateTime duplicateOnFirst = LocalDate.now().atTime(8, 59,59,9);
        LocalDateTime duplicateOnSecond = LocalDate.now().atTime(9, 00,00,1);
        //when
        attendanceCheckService.onOffWorkCheck(empno, duplicateOnFirst);
        AttendanceTime attendanceTime = attendanceCheckMapper.findAttendanceTimeByEmpno(empno, onOffWork).get();
        AttendanceStatus attendanceStatus = attendanceCheckMapper.findByEmpno(empno, LocalDate.now()).get();
        String duplicateMsg = attendanceCheckService.onOffWorkCheck(empno, duplicateOnSecond);
        //then
        assertThat(attendanceTime.getDate()).isEqualTo(duplicateOnFirst);
        assertThat(attendanceStatus.getDate().toLocalDate()).isEqualTo(LocalDate.now());
        assertThat(attendanceStatus.getAttendance()).isEqualTo(1);
        assertThat(duplicateMsg).isEqualTo("이미 출근하셨습니다");
    }

    @Test
    @DisplayName("중복출근(지각)")
    public void onWorkDuplicateTardyTest() throws Exception {
        //given
        String empno = "220109";
        int onOffWork = 1;
        LocalDateTime duplicateOnFirst = LocalDate.now().atTime(9, 00,00,100000000);
        LocalDateTime duplicateOnSecond = LocalDate.now().atTime(9, 00,00,1);
        //when
        attendanceCheckService.onOffWorkCheck(empno, duplicateOnFirst);
        AttendanceTime attendanceTime = attendanceCheckMapper.findAttendanceTimeByEmpno(empno, onOffWork).get();
        AttendanceStatus attendanceStatus = attendanceCheckMapper.findByEmpno(empno, LocalDate.now()).get();
        String duplicateMsg = attendanceCheckService.onOffWorkCheck(empno, duplicateOnSecond);
        //then
        assertThat(duplicateMsg).isEqualTo("퇴근시간이 아닙니다.");
        assertThat(attendanceTime.getDate()).isEqualTo(duplicateOnFirst);
        assertThat(attendanceStatus.getDate().toLocalDate()).isEqualTo(LocalDate.now());
        assertThat(attendanceStatus.getAttendance()).isEqualTo(1);
        assertThat(duplicateMsg).isEqualTo("이미 출근하셨습니다");
    }

    @Test
    @DisplayName("지각")
    public void onWorkTardyTest() throws Exception {
        //given
        String empno = "220109";
        LocalDateTime tardy = LocalDate.now().atTime(9, 00,00,1);
        //when
        String tardyMsg = attendanceCheckService.onOffWorkCheck(empno, tardy);
        //then
        assertThat(tardyMsg).isEqualTo("지각입니다.");


    }

    @Test
    @DisplayName("출근시간 X")
    public void beforeOnWorkTest() throws Exception {
        //given
        String empno = "220109";
        LocalDateTime beforeOnWork = LocalDate.now().atTime(4, 59,59,9);
        //when
        String beforeOnWorkMsg = attendanceCheckService.onOffWorkCheck(empno, beforeOnWork);
        //then
        assertThat(beforeOnWorkMsg).isEqualTo("출근시간이 아닙니다.");

    }

    @Test
    @DisplayName("정상퇴근")
    public void offWorkNormalTest() throws Exception {
        //given
        String empno = "220109";
        LocalDateTime normalOn = LocalDate.now().atTime(8, 59,59,1);
        LocalDateTime normalOff = LocalDate.now().atTime(18, 00,00,1);
        //when
        attendanceCheckService.onOffWorkCheck(empno, normalOn);
        String normalMsg = attendanceCheckService.onOffWorkCheck(empno, normalOff);
        //then
        assertThat(normalMsg).isEqualTo("퇴근");
    }

    @Test
    @DisplayName("중복퇴근")
    public void offWorkDuplicateTest() throws Exception {
        //given
        String empno = "220109";
        LocalDateTime duplicateOffFirst = LocalDate.now().atTime(18, 00,00,1);
        LocalDateTime duplicateOffSecond = LocalDate.now().atTime(18, 00,00,1);
        //when
        attendanceCheckService.onOffWorkCheck(empno, duplicateOffFirst);
        String duplicateMsg = attendanceCheckService.onOffWorkCheck(empno, duplicateOffSecond);
        //then
        assertThat(duplicateMsg).isEqualTo("이미 퇴근하셨습니다");
    }

    @Test
    @DisplayName("출근미등록")
    public void onWorkUnregisteredTest() throws Exception {
        //given
        String empno = "220109";
        LocalDateTime unregisteredOff = LocalDate.now().atTime(18, 00,00,1);
        //when
        String unregisteredMsg = attendanceCheckService.onOffWorkCheck(empno, unregisteredOff);
        //then
        assertThat(unregisteredMsg).isEqualTo("퇴근(출근 미등록)");
    }

}
