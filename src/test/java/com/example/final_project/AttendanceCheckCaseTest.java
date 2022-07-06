package com.example.final_project;

import com.example.final_project.mapper.AttendanceCheckMapper;
import com.example.final_project.mapper.ProgressBar52hMapper;
import com.example.final_project.model.AttendanceStatus;
import com.example.final_project.model.AttendanceTime;
import com.example.final_project.service.AttendanceCheckService;
import lombok.extern.slf4j.Slf4j;
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
import java.time.LocalTime;

@MybatisTest
@Slf4j
@ExtendWith(SpringExtension.class)
@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.NONE) // 실제 DB 연결 테스트
public class AttendanceCheckCaseTest {
    @Autowired
    AttendanceCheckMapper attendanceCheckMapper;
    @Autowired
    ProgressBar52hMapper progressBar52hMapper;
    AttendanceCheckService attendanceCheckService;
    @BeforeEach
    void init(){
        attendanceCheckService = new AttendanceCheckService(attendanceCheckMapper,progressBar52hMapper);
    }
    @Test
    @DisplayName("#1 정상출근")
    public void onWorkNormalTest1() throws Exception {
        //given
        String empno = "220109";
        int onOffWork = 1;
        LocalDateTime normal = LocalDate.now().atTime(8, 59,59);

        //when
        String normalMsg = attendanceCheckService.onOffWorkCheck(empno, normal);
        AttendanceTime attendanceTime = attendanceCheckMapper.findAttendanceTimeByEmpno(empno, onOffWork,normal).get();
        AttendanceStatus attendanceStatus = attendanceCheckMapper.findByEmpno(empno, LocalDate.now()).get();

        //then
        assertThat(attendanceTime.getDate()).isEqualTo(normal);
        assertThat(attendanceStatus.getDate().toLocalDate()).isEqualTo(LocalDate.now());
        assertThat(attendanceStatus.getAttendance()).isEqualTo(1);
        assertThat(normalMsg).isEqualTo("출근");
    }

    @Test
    @DisplayName("#2 정상출근2")
    public void onWorkNormalTest2() throws Exception {
        //given
        String empno = "220109";
        int onOffWork = 1;
        LocalDateTime normal = LocalDate.now().atTime(9, 00,00);

        //when
        String normalMsg = attendanceCheckService.onOffWorkCheck(empno, normal);
        AttendanceTime attendanceTime = attendanceCheckMapper.findAttendanceTimeByEmpno(empno, onOffWork, normal).get();
        AttendanceStatus attendanceStatus = attendanceCheckMapper.findByEmpno(empno, LocalDate.now()).get();

        //then
        assertThat(attendanceTime.getDate()).isEqualTo(normal);
        assertThat(attendanceStatus.getDate().toLocalDate()).isEqualTo(LocalDate.now());
        assertThat(attendanceStatus.getAttendance()).isEqualTo(1);
        assertThat(normalMsg).isEqualTo("출근");
    }

    @Test
    @DisplayName("#3 출근(지각)")
    public void onWorkTardyTest() throws Exception {
        //given
        String empno = "220109";
        int onOffWork = 1;
        LocalDateTime tardy = LocalDate.now().atTime(9, 00,01);
        //when
        String tardyMsg = attendanceCheckService.onOffWorkCheck(empno, tardy);
        AttendanceTime attendanceTime = attendanceCheckMapper.findAttendanceTimeByEmpno(empno, onOffWork, tardy).get();
        AttendanceStatus attendanceStatus = attendanceCheckMapper.findByEmpno(empno, LocalDate.now()).get();
        //then
        assertThat(attendanceTime.getDate()).isEqualTo(tardy);
        assertThat(attendanceStatus.getDate().toLocalDate()).isEqualTo(LocalDate.now());
        assertThat(attendanceStatus.getAttendance()).isEqualTo(1);
        assertThat(attendanceStatus.getTardy()).isEqualTo(1);
        assertThat(tardyMsg).isEqualTo("지각입니다.");

    }

    @Test
    @DisplayName("#4 중복출근(정상+정상)")
    public void onWorkDuplicateTest1() throws Exception {
        //given
        String empno = "220109";
        int onOffWork = 1;
        LocalDateTime duplicateOn = LocalDate.now().atTime(9, 00,00);
        //when
        attendanceCheckService.onOffWorkCheck(empno, duplicateOn);
        AttendanceTime attendanceTime = attendanceCheckMapper.findAttendanceTimeByEmpno(empno, onOffWork, duplicateOn).get();
        AttendanceStatus attendanceStatus = attendanceCheckMapper.findByEmpno(empno, LocalDate.now()).get();
        String duplicateMsg = attendanceCheckService.onOffWorkCheck(empno, duplicateOn);
        //then
        assertThat(attendanceTime.getDate()).isEqualTo(duplicateOn);
        assertThat(attendanceStatus.getDate().toLocalDate()).isEqualTo(LocalDate.now());
        assertThat(attendanceStatus.getAttendance()).isEqualTo(1);
        assertThat(duplicateMsg).isEqualTo("이미 출근하셨습니다");
    }

    @Test
    @DisplayName("#5 중복출근(정상+지각)")
    public void onWorkDuplicateTest2() throws Exception {
        //given
        String empno = "220109";
        int onOffWork = 1;
        LocalDateTime duplicateOn = LocalDate.now().atTime(9, 00,00);
        LocalDateTime duplicateOnLate = LocalDate.now().atTime(9, 00,01);
        //when
        attendanceCheckService.onOffWorkCheck(empno, duplicateOn);
        AttendanceTime attendanceTime = attendanceCheckMapper.findAttendanceTimeByEmpno(empno, onOffWork, duplicateOn).get();
        AttendanceStatus attendanceStatus = attendanceCheckMapper.findByEmpno(empno, LocalDate.now()).get();
        String duplicateMsg = attendanceCheckService.onOffWorkCheck(empno, duplicateOnLate);
        //then
        assertThat(attendanceTime.getDate()).isEqualTo(duplicateOn);
        assertThat(attendanceStatus.getDate().toLocalDate()).isEqualTo(LocalDate.now());
        assertThat(attendanceStatus.getAttendance()).isEqualTo(1);
        assertThat(duplicateMsg).isEqualTo("퇴근시간이 아닙니다.");
    }

    @Test
    @DisplayName("#6 중복출근(지각+지각)")
    public void onWorkDuplicateTardyTest() throws Exception {
        //given
        String empno = "220109";
        int onOffWork = 1;
        LocalDateTime duplicateOnLate = LocalDate.now().atTime(9, 00,01);
        //when
        String msg = attendanceCheckService.onOffWorkCheck(empno, duplicateOnLate);
        AttendanceTime attendanceTime = attendanceCheckMapper.findAttendanceTimeByEmpno(empno, onOffWork, duplicateOnLate).get();
        AttendanceStatus attendanceStatus = attendanceCheckMapper.findByEmpno(empno, LocalDate.now()).get();
        String duplicateMsg = attendanceCheckService.onOffWorkCheck(empno, duplicateOnLate);
        //then
        assertThat(attendanceTime.getDate()).isEqualTo(duplicateOnLate);
        assertThat(attendanceStatus.getDate().toLocalDate()).isEqualTo(LocalDate.now());
        assertThat(attendanceStatus.getAttendance()).isEqualTo(1);
        assertThat(attendanceStatus.getTardy()).isEqualTo(1);
        assertThat(msg).isEqualTo("지각입니다.");
        assertThat(duplicateMsg).isEqualTo("퇴근시간이 아닙니다.");
    }

    @Test
    @DisplayName("#7 시간연차1")
    public void onWorkTimeVacation1() throws Exception {
        //given
        String empno = "220109";
        int onOffWork = 1;
        LocalDateTime normal = LocalDate.of(2022,06,29).atTime(10, 59,59);
        //when
        String msg = attendanceCheckService.onOffWorkCheck(empno, normal);
        AttendanceTime attendanceTime = attendanceCheckMapper.findAttendanceTimeByEmpnoForTest(empno, onOffWork,normal).get();
        AttendanceStatus attendanceStatus = attendanceCheckMapper.findByEmpno(empno, LocalDate.of(2022,06,29)).get();

        //then
        assertThat(attendanceTime.getDate()).isEqualTo(normal);
        assertThat(attendanceStatus.getDate().toLocalDate()).isEqualTo(LocalDate.of(2022,06,29));
        assertThat(attendanceStatus.getAttendance()).isEqualTo(1);
        assertThat(msg).isEqualTo("출근");
    }

    @Test
    @DisplayName("#8 시간연차2")
    public void onWorkTimeVacation2() throws Exception {
        //given
        String empno = "220109";
        int onOffWork = 1;
        LocalDateTime normal = LocalDate.of(2022,06,29).atTime(11, 00,00);

        //when
        String msg = attendanceCheckService.onOffWorkCheck(empno, normal);
        AttendanceTime attendanceTime = attendanceCheckMapper.findAttendanceTimeByEmpnoForTest(empno, onOffWork,normal).get();
        AttendanceStatus attendanceStatus = attendanceCheckMapper.findByEmpno(empno, LocalDate.of(2022,06,29)).get();

        //then
        assertThat(attendanceTime.getDate()).isEqualTo(normal);
        assertThat(attendanceStatus.getDate().toLocalDate()).isEqualTo(LocalDate.of(2022,06,29));
        assertThat(attendanceStatus.getAttendance()).isEqualTo(1);
        assertThat(msg).isEqualTo("출근");
    }

    @Test
    @DisplayName("#9 시간연차(지각)")
    public void onWorkTimeVacationTardy() throws Exception {
        //given
        String empno = "220109";
        int onOffWork = 1;
        LocalDateTime tardy = LocalDate.of(2022,06,29).atTime(11, 00,01);

        //when
        String msg = attendanceCheckService.onOffWorkCheck(empno, tardy);
        AttendanceTime attendanceTime = attendanceCheckMapper.findAttendanceTimeByEmpnoForTest(empno, onOffWork,tardy).get();
        AttendanceStatus attendanceStatus = attendanceCheckMapper.findByEmpno(empno, LocalDate.of(2022,06,29)).get();

        //then
        assertThat(attendanceTime.getDate()).isEqualTo(tardy);
        assertThat(attendanceStatus.getDate().toLocalDate()).isEqualTo(LocalDate.of(2022,06,29));
        assertThat(attendanceStatus.getAttendance()).isEqualTo(1);
        assertThat(attendanceStatus.getTardy()).isEqualTo(1);
        assertThat(msg).isEqualTo("지각입니다.");
    }
    @Test
    @DisplayName("#10 오후반차(퇴근 시간 X)")
    public void offWorkHalfVacationEarly() throws Exception {
        //given
        String empno = "220109";
        LocalDateTime onWork = LocalDate.of(2022,07,01).atTime(9, 00,00);
        LocalDateTime early = LocalDate.of(2022,07,01).atTime(13, 59,59);

        //when
        attendanceCheckService.onOffWorkCheck(empno, onWork);
        String msg = attendanceCheckService.onOffWorkCheck(empno, early);
        AttendanceStatus attendanceStatus = attendanceCheckMapper.findByEmpno(empno, LocalDate.of(2022,07,01)).get();

        //then
        assertThat(attendanceStatus.getDate().toLocalDate()).isEqualTo(LocalDate.of(2022,07,01));
        assertThat(msg).isEqualTo("퇴근시간이 아닙니다.");
    }

    @Test
    @DisplayName("#11 오후반차1")
    public void offWorkHalfVacation1() throws Exception {
        //given
        String empno = "220109";
        int onOffWork = 0;
        LocalDateTime onWork = LocalDate.of(2022,07,01).atTime(9, 00,00);
        LocalDateTime normal = LocalDate.of(2022,07,01).atTime(14, 00,00);

        //when
        attendanceCheckService.onOffWorkCheck(empno, onWork);
        String msg = attendanceCheckService.onOffWorkCheck(empno, normal);

        AttendanceTime attendanceTime = attendanceCheckMapper.findAttendanceTimeByEmpnoForTest(empno, onOffWork,normal).get();
        AttendanceStatus attendanceStatus = attendanceCheckMapper.findByEmpno(empno, LocalDate.of(2022,07,01)).get();

        //then
        assertThat(attendanceTime.getDate()).isEqualTo(normal);
        assertThat(attendanceStatus.getDate().toLocalDate()).isEqualTo(LocalDate.of(2022,07,01));
        assertThat(msg).isEqualTo("퇴근");
    }

    @Test
    @DisplayName("#12 오후반차2")
    public void offWorkHalfVacation2() throws Exception {
        //given
        String empno = "220109";
        int onOffWork = 0;
        LocalDateTime onWork = LocalDate.of(2022,07,01).atTime(9, 00,00);
        LocalDateTime normal = LocalDate.of(2022,07,01).atTime(14, 00,01);

        //when
        attendanceCheckService.onOffWorkCheck(empno, onWork);
        String msg = attendanceCheckService.onOffWorkCheck(empno, normal);
        AttendanceTime attendanceTime = attendanceCheckMapper.findAttendanceTimeByEmpnoForTest(empno, onOffWork,normal).get();
        AttendanceStatus attendanceStatus = attendanceCheckMapper.findByEmpno(empno, LocalDate.of(2022,07,01)).get();

        //then
        assertThat(attendanceTime.getDate()).isEqualTo(normal);
        assertThat(attendanceStatus.getDate().toLocalDate()).isEqualTo(LocalDate.of(2022,07,01));
        assertThat(msg).isEqualTo("퇴근");
    }

    @Test
    @DisplayName("#13 오전반차1")
    public void onWorkHalfVacation1() throws Exception {
        //given
        String empno = "220109";
        int onOffWork = 0;
        LocalDateTime normal = LocalDate.of(2022,07,01).atTime(13, 59,59);

        //when
        String msg = attendanceCheckService.onOffWorkCheck(empno, normal);

        AttendanceTime attendanceTime = attendanceCheckMapper.findAttendanceTimeByEmpnoForTest(empno, onOffWork,normal).get();
        AttendanceStatus attendanceStatus = attendanceCheckMapper.findByEmpno(empno, LocalDate.of(2022,07,01)).get();

        //then
        assertThat(attendanceTime.getDate()).isEqualTo(normal);
        assertThat(attendanceStatus.getDate().toLocalDate()).isEqualTo(LocalDate.of(2022,07,01));
        assertThat(msg).isEqualTo("퇴근");
    }


    @Test
    @DisplayName("퇴근시간")
    public void beforeOnWorkTest() throws Exception {
        //given
        String empno = "220109";
        LocalDateTime beforeOnWork = LocalDate.now().atTime(5, 59,59);
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
