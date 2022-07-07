package com.example.final_project;

import com.example.final_project.mapper.AttendanceCheckMapper;
import com.example.final_project.mapper.EmployeeMapper;
import com.example.final_project.mapper.SubComponentMapper;
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


@MybatisTest
@Slf4j
@ExtendWith(SpringExtension.class)
@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.NONE) // 실제 DB 연결 테스트
public class AttendanceCheckCaseTest {
    @Autowired
    AttendanceCheckMapper attendanceCheckMapper;
    @Autowired
    SubComponentMapper subComponentMapper;
    @Autowired
    EmployeeMapper employeeMapper;
    AttendanceCheckService attendanceCheckService;
    @BeforeEach
    void init(){
        attendanceCheckService = new AttendanceCheckService(attendanceCheckMapper,subComponentMapper,employeeMapper);
    }
    @Test
    @DisplayName("#1 정상출근")
    public void onWorkNormalTest1(){
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
        assertThat(normalMsg).isEqualTo(employeeMapper.findNameByempno(empno) + "(" + empno + ")님 " + "출근하셨습니다.");
    }

    @Test
    @DisplayName("#2 정상출근2")
    public void onWorkNormalTest2(){
        //given
        String empno = "220109";
        int onOffWork = 1;
        LocalDateTime normal = LocalDate.now().atTime(9, 0,0);

        //when
        String normalMsg = attendanceCheckService.onOffWorkCheck(empno, normal);
        AttendanceTime attendanceTime = attendanceCheckMapper.findAttendanceTimeByEmpno(empno, onOffWork, normal).get();
        AttendanceStatus attendanceStatus = attendanceCheckMapper.findByEmpno(empno, LocalDate.now()).get();

        //then
        assertThat(attendanceTime.getDate()).isEqualTo(normal);
        assertThat(attendanceStatus.getDate().toLocalDate()).isEqualTo(LocalDate.now());
        assertThat(attendanceStatus.getAttendance()).isEqualTo(1);
        assertThat(normalMsg).isEqualTo(employeeMapper.findNameByempno(empno) + "(" + empno + ")님 " + "출근하셨습니다.");
    }

    @Test
    @DisplayName("#3 출근(지각)")
    public void onWorkTardyTest(){
        //given
        String empno = "220109";
        int onOffWork = 1;
        LocalDateTime tardy = LocalDate.now().atTime(9, 0,1);
        //when
        String tardyMsg = attendanceCheckService.onOffWorkCheck(empno, tardy);
        AttendanceTime attendanceTime = attendanceCheckMapper.findAttendanceTimeByEmpno(empno, onOffWork, tardy).get();
        AttendanceStatus attendanceStatus = attendanceCheckMapper.findByEmpno(empno, LocalDate.now()).get();
        //then
        assertThat(attendanceTime.getDate()).isEqualTo(tardy);
        assertThat(attendanceStatus.getDate().toLocalDate()).isEqualTo(LocalDate.now());
        assertThat(attendanceStatus.getAttendance()).isEqualTo(1);
        assertThat(attendanceStatus.getTardy()).isEqualTo(1);
        assertThat(tardyMsg).isEqualTo(employeeMapper.findNameByempno(empno) + "(" + empno + ")님 " + "지각입니다.");

    }

    @Test
    @DisplayName("#4 중복출근(정상+정상)")
    public void onWorkDuplicateTest1(){
        //given
        String empno = "220109";
        int onOffWork = 1;
        LocalDateTime duplicateOn = LocalDate.now().atTime(9, 0,0);
        //when
        attendanceCheckService.onOffWorkCheck(empno, duplicateOn);
        AttendanceTime attendanceTime = attendanceCheckMapper.findAttendanceTimeByEmpno(empno, onOffWork, duplicateOn).get();
        AttendanceStatus attendanceStatus = attendanceCheckMapper.findByEmpno(empno, LocalDate.now()).get();
        String duplicateMsg = attendanceCheckService.onOffWorkCheck(empno, duplicateOn);
        //then
        assertThat(attendanceTime.getDate()).isEqualTo(duplicateOn);
        assertThat(attendanceStatus.getDate().toLocalDate()).isEqualTo(LocalDate.now());
        assertThat(attendanceStatus.getAttendance()).isEqualTo(1);
        assertThat(duplicateMsg).isEqualTo(employeeMapper.findNameByempno(empno) + "(" + empno + ")님 " + "이미 출근하셨습니다.");
    }

    @Test
    @DisplayName("#5 중복출근(정상+지각)")
    public void onWorkDuplicateTest2(){
        //given
        String empno = "220109";
        int onOffWork = 1;
        LocalDateTime duplicateOn = LocalDate.now().atTime(9, 0,0);
        LocalDateTime duplicateOnLate = LocalDate.now().atTime(9, 0,1);
        //when
        attendanceCheckService.onOffWorkCheck(empno, duplicateOn);
        AttendanceTime attendanceTime = attendanceCheckMapper.findAttendanceTimeByEmpno(empno, onOffWork, duplicateOn).get();
        AttendanceStatus attendanceStatus = attendanceCheckMapper.findByEmpno(empno, LocalDate.now()).get();
        String duplicateMsg = attendanceCheckService.onOffWorkCheck(empno, duplicateOnLate);
        //then
        assertThat(attendanceTime.getDate()).isEqualTo(duplicateOn);
        assertThat(attendanceStatus.getDate().toLocalDate()).isEqualTo(LocalDate.now());
        assertThat(attendanceStatus.getAttendance()).isEqualTo(1);
        assertThat(duplicateMsg).isEqualTo(employeeMapper.findNameByempno(empno) + "(" + empno + ")님 " + "퇴근시간이 아닙니다.");
    }

    @Test
    @DisplayName("#6 중복출근(지각+지각)")
    public void onWorkDuplicateTardyTest(){
        //given
        String empno = "220109";
        int onOffWork = 1;
        LocalDateTime duplicateOnLate = LocalDate.now().atTime(9, 0,1);
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
        assertThat(msg).isEqualTo(employeeMapper.findNameByempno(empno) + "(" + empno + ")님 " + "지각입니다.");
        assertThat(duplicateMsg).isEqualTo(employeeMapper.findNameByempno(empno) + "(" + empno + ")님 " + "퇴근시간이 아닙니다.");
    }

    @Test
    @DisplayName("#7 시간연차1 - 오전")
    public void onWorkTimeVacation1(){
        //given
        String empno = "220109";
        int onOffWork = 1;
        LocalDateTime normal = LocalDate.of(2022,6,29).atTime(10, 59,59);
        //when
        String msg = attendanceCheckService.onOffWorkCheck(empno, normal);
        AttendanceTime attendanceTime = attendanceCheckMapper.findAttendanceTimeByEmpnoForTest(empno, onOffWork,normal).get();
        AttendanceStatus attendanceStatus = attendanceCheckMapper.findByEmpno(empno, LocalDate.of(2022,6,29)).get();

        //then
        assertThat(attendanceTime.getDate()).isEqualTo(normal);
        assertThat(attendanceStatus.getDate().toLocalDate()).isEqualTo(LocalDate.of(2022,6,29));
        assertThat(attendanceStatus.getAttendance()).isEqualTo(1);
        assertThat(msg).isEqualTo(employeeMapper.findNameByempno(empno) + "(" + empno + ")님 " + "출근하셨습니다.");
    }

    @Test
    @DisplayName("#8 시간연차2 - 오전")
    public void onWorkTimeVacation2(){
        //given
        String empno = "220109";
        int onOffWork = 1;
        LocalDateTime normal = LocalDate.of(2022,6,29).atTime(11, 0,0);

        //when
        String msg = attendanceCheckService.onOffWorkCheck(empno, normal);
        AttendanceTime attendanceTime = attendanceCheckMapper.findAttendanceTimeByEmpnoForTest(empno, onOffWork,normal).get();
        AttendanceStatus attendanceStatus = attendanceCheckMapper.findByEmpno(empno, LocalDate.of(2022,6,29)).get();

        //then
        assertThat(attendanceTime.getDate()).isEqualTo(normal);
        assertThat(attendanceStatus.getDate().toLocalDate()).isEqualTo(LocalDate.of(2022,6,29));
        assertThat(attendanceStatus.getAttendance()).isEqualTo(1);
        assertThat(msg).isEqualTo(employeeMapper.findNameByempno(empno) + "(" + empno + ")님 " + "출근하셨습니다.");
    }

    @Test
    @DisplayName("#9 시간연차(지각) - 오전")
    public void onWorkTimeVacationTardy(){
        //given
        String empno = "220109";
        int onOffWork = 1;
        LocalDateTime tardy = LocalDate.of(2022,6,29).atTime(11, 0,1);

        //when
        String msg = attendanceCheckService.onOffWorkCheck(empno, tardy);
        AttendanceTime attendanceTime = attendanceCheckMapper.findAttendanceTimeByEmpnoForTest(empno, onOffWork,tardy).get();
        AttendanceStatus attendanceStatus = attendanceCheckMapper.findByEmpno(empno, LocalDate.of(2022,6,29)).get();

        //then
        assertThat(attendanceTime.getDate()).isEqualTo(tardy);
        assertThat(attendanceStatus.getDate().toLocalDate()).isEqualTo(LocalDate.of(2022,6,29));
        assertThat(attendanceStatus.getAttendance()).isEqualTo(1);
        assertThat(attendanceStatus.getTardy()).isEqualTo(1);
        assertThat(msg).isEqualTo(employeeMapper.findNameByempno(empno) + "(" + empno + ")님 " + "지각입니다.");
    }
    @Test
    @DisplayName("#10 오후반차(퇴근 시간 X)")
    public void offWorkHalfVacationEarly(){
        //given
        String empno = "220109";
        int onOffWork = 0;
        LocalDateTime onWork = LocalDate.of(2022,7,1).atTime(9, 0,0);
        LocalDateTime early = LocalDate.of(2022,7,1).atTime(12, 59,59);

        //when
        attendanceCheckService.onOffWorkCheck(empno, onWork);
        String msg = attendanceCheckService.onOffWorkCheck(empno, early);
        boolean check = attendanceCheckMapper.findAttendanceTimeByEmpno(empno, onOffWork,early).isEmpty();
        AttendanceStatus attendanceStatus = attendanceCheckMapper.findByEmpno(empno, LocalDate.of(2022,7,1)).get();

        //then
        assertThat(attendanceStatus.getDate().toLocalDate()).isEqualTo(LocalDate.of(2022,7,1));
        assertThat(check).isEqualTo(true);
        assertThat(msg).isEqualTo(employeeMapper.findNameByempno(empno) + "(" + empno + ")님 " + "퇴근시간이 아닙니다.");
    }

    @Test
    @DisplayName("#11 오후반차1")
    public void offWorkHalfVacation1(){
        //given
        String empno = "220109";
        int onOffWork = 0;
        LocalDateTime onWork = LocalDate.of(2022,7,1).atTime(9, 0,0);
        LocalDateTime normal = LocalDate.of(2022,7,1).atTime(13, 0,0);

        //when
        attendanceCheckService.onOffWorkCheck(empno, onWork);
        String msg = attendanceCheckService.onOffWorkCheck(empno, normal);

        AttendanceTime attendanceTime = attendanceCheckMapper.findAttendanceTimeByEmpnoForTest(empno, onOffWork,normal).get();
        AttendanceStatus attendanceStatus = attendanceCheckMapper.findByEmpno(empno, LocalDate.of(2022,7,1)).get();

        //then
        assertThat(attendanceTime.getDate()).isEqualTo(normal);
        assertThat(attendanceStatus.getDate().toLocalDate()).isEqualTo(LocalDate.of(2022,7,1));
        assertThat(msg).isEqualTo(employeeMapper.findNameByempno(empno) + "(" + empno + ")님 " + "퇴근하셨습니다.");
    }

    @Test
    @DisplayName("#12 오후반차2")
    public void offWorkHalfVacation2(){
        //given
        String empno = "220109";
        int onOffWork = 0;
        LocalDateTime onWork = LocalDate.of(2022,7,1).atTime(9, 0,0);
        LocalDateTime normal = LocalDate.of(2022,7,1).atTime(13, 0,1);

        //when
        attendanceCheckService.onOffWorkCheck(empno, onWork);
        String msg = attendanceCheckService.onOffWorkCheck(empno, normal);
        AttendanceTime attendanceTime = attendanceCheckMapper.findAttendanceTimeByEmpnoForTest(empno, onOffWork,normal).get();
        AttendanceStatus attendanceStatus = attendanceCheckMapper.findByEmpno(empno, LocalDate.of(2022,7,1)).get();

        //then
        assertThat(attendanceTime.getDate()).isEqualTo(normal);
        assertThat(attendanceStatus.getDate().toLocalDate()).isEqualTo(LocalDate.of(2022,7,1));
        assertThat(msg).isEqualTo(employeeMapper.findNameByempno(empno) + "(" + empno + ")님 " + "퇴근하셨습니다.");
    }

    @Test
    @DisplayName("#13 오후반차(지각)")
    public void offWorkHalfVacationTardy(){
        //given
        String empno = "220109";
        int onOffWork = 0;
        LocalDateTime onWork = LocalDate.of(2022,7,1).atTime(9, 0,1);
        LocalDateTime normal = LocalDate.of(2022,7,1).atTime(13, 0,0);

        //when
        String tardyMsg = attendanceCheckService.onOffWorkCheck(empno, onWork);
        String msg = attendanceCheckService.onOffWorkCheck(empno, normal);

        AttendanceTime attendanceTime = attendanceCheckMapper.findAttendanceTimeByEmpnoForTest(empno, onOffWork,normal).get();
        AttendanceStatus attendanceStatus = attendanceCheckMapper.findByEmpno(empno, LocalDate.of(2022,7,1)).get();

        //then
        assertThat(attendanceTime.getDate()).isEqualTo(normal);
        assertThat(attendanceStatus.getDate().toLocalDate()).isEqualTo(LocalDate.of(2022,7,1));
        assertThat(tardyMsg).isEqualTo(employeeMapper.findNameByempno(empno) + "(" + empno + ")님 " + "지각입니다.");
        assertThat(msg).isEqualTo(employeeMapper.findNameByempno(empno) + "(" + empno + ")님 " + "퇴근하셨습니다.");
    }

    @Test
    @DisplayName("#14 오전반차1")
    public void onWorkHalfVacation1(){
        //given
        String empno = "220109";
        int onOffWork = 1;
        LocalDateTime normal = LocalDate.of(2022,6,30).atTime(13, 59,59);

        //when
        String msg = attendanceCheckService.onOffWorkCheck(empno, normal);
        AttendanceTime attendanceTime = attendanceCheckMapper.findAttendanceTimeByEmpnoForTest(empno, onOffWork,normal).get();
        AttendanceStatus attendanceStatus = attendanceCheckMapper.findByEmpno(empno, LocalDate.of(2022,6,30)).get();

        //then
        assertThat(attendanceTime.getDate()).isEqualTo(normal);
        assertThat(attendanceStatus.getDate().toLocalDate()).isEqualTo(LocalDate.of(2022,6,30));
        assertThat(msg).isEqualTo(employeeMapper.findNameByempno(empno) + "(" + empno + ")님 " + "출근하셨습니다.");
    }

    @Test
    @DisplayName("#15 오전반차2")
    public void onWorkHalfVacation2(){
        //given
        String empno = "220109";
        int onOffWork = 1;
        LocalDateTime normal = LocalDate.of(2022,6,30).atTime(14,0,0);

        //when
        String msg = attendanceCheckService.onOffWorkCheck(empno, normal);
        AttendanceTime attendanceTime = attendanceCheckMapper.findAttendanceTimeByEmpnoForTest(empno, onOffWork,normal).get();
        AttendanceStatus attendanceStatus = attendanceCheckMapper.findByEmpno(empno, LocalDate.of(2022,6,30)).get();

        //then
        assertThat(attendanceTime.getDate()).isEqualTo(normal);
        assertThat(attendanceStatus.getDate().toLocalDate()).isEqualTo(LocalDate.of(2022,6,30));
        assertThat(msg).isEqualTo(employeeMapper.findNameByempno(empno) + "(" + empno + ")님 " + "출근하셨습니다.");
    }

    @Test
    @DisplayName("#16 오전반차(지각)")
    public void onWorkHalfVacationTardy(){
        //given
        String empno = "220109";
        int onOffWork = 1;
        LocalDateTime tardy = LocalDate.of(2022,6,30).atTime(14,0,1);

        //when
        String msg = attendanceCheckService.onOffWorkCheck(empno, tardy);
        AttendanceTime attendanceTime = attendanceCheckMapper.findAttendanceTimeByEmpnoForTest(empno, onOffWork,tardy).get();
        AttendanceStatus attendanceStatus = attendanceCheckMapper.findByEmpno(empno, LocalDate.of(2022,6,30)).get();

        //then
        assertThat(attendanceTime.getDate()).isEqualTo(tardy);
        assertThat(attendanceStatus.getDate().toLocalDate()).isEqualTo(LocalDate.of(2022,6,30));
        assertThat(attendanceStatus.getTardy()).isEqualTo(1);
        assertThat(msg).isEqualTo(employeeMapper.findNameByempno(empno) + "(" + empno + ")님 " + "지각입니다.");
    }

    @Test
    @DisplayName("#17 시간연차(퇴근 시간X) - 오후")
    public void offWorkTimeVacationEarly(){
        //given
        String empno = "220109";
        int onOffWork = 0;
        LocalDateTime onWork = LocalDate.of(2022,7,2).atTime(9, 0,0);
        LocalDateTime offWork = LocalDate.of(2022,7,2).atTime(15, 59,59);

        //when
        attendanceCheckService.onOffWorkCheck(empno, onWork);
        String msg = attendanceCheckService.onOffWorkCheck(empno, offWork);
        boolean check = attendanceCheckMapper.findAttendanceTimeByEmpno(empno, onOffWork,offWork).isEmpty();
        AttendanceStatus attendanceStatus = attendanceCheckMapper.findByEmpno(empno, LocalDate.of(2022,7,2)).get();

        //then
        assertThat(attendanceStatus.getDate().toLocalDate()).isEqualTo(LocalDate.of(2022,7,2));
        assertThat(check).isEqualTo(true);
        assertThat(msg).isEqualTo(employeeMapper.findNameByempno(empno) + "(" + empno + ")님 " + "퇴근시간이 아닙니다.");
    }

    @Test
    @DisplayName("#18 시간연차1 - 오후")
    public void offWorkTimeVacation1(){
        //given
        String empno = "220109";
        int onOffWork = 0;
        LocalDateTime onWork = LocalDate.of(2022,7,2).atTime(9, 0,0);
        LocalDateTime offWork = LocalDate.of(2022,7,2).atTime(16, 0,0);

        //when
        attendanceCheckService.onOffWorkCheck(empno, onWork);
        String msg = attendanceCheckService.onOffWorkCheck(empno, offWork);
        AttendanceTime attendanceTime = attendanceCheckMapper.findAttendanceTimeByEmpnoForTest(empno, onOffWork,offWork).get();
        AttendanceStatus attendanceStatus = attendanceCheckMapper.findByEmpno(empno, LocalDate.of(2022,7,2)).get();

        //then
        assertThat(attendanceTime.getDate()).isEqualTo(offWork);
        assertThat(attendanceStatus.getDate().toLocalDate()).isEqualTo(LocalDate.of(2022,7,2));
        assertThat(msg).isEqualTo(employeeMapper.findNameByempno(empno) + "(" + empno + ")님 " + "퇴근하셨습니다.");
    }

    @Test
    @DisplayName("#19 시간연차2 - 오후")
    public void offWorkTimeVacation2(){
        //given
        String empno = "220109";
        int onOffWork = 0;
        LocalDateTime onWork = LocalDate.of(2022,7,2).atTime(9, 0,0);
        LocalDateTime offWork = LocalDate.of(2022,7,2).atTime(16, 0,1);

        //when
        attendanceCheckService.onOffWorkCheck(empno, onWork);
        String msg = attendanceCheckService.onOffWorkCheck(empno, offWork);
        AttendanceTime attendanceTime = attendanceCheckMapper.findAttendanceTimeByEmpnoForTest(empno, onOffWork,offWork).get();
        AttendanceStatus attendanceStatus = attendanceCheckMapper.findByEmpno(empno, LocalDate.of(2022,7,2)).get();

        //then
        assertThat(attendanceTime.getDate()).isEqualTo(offWork);
        assertThat(attendanceStatus.getDate().toLocalDate()).isEqualTo(LocalDate.of(2022,7,2));
        assertThat(msg).isEqualTo(employeeMapper.findNameByempno(empno) + "(" + empno + ")님 " + "퇴근하셨습니다.");
    }

    @Test
    @DisplayName("#20 시간연차(지각) - 오후")
    public void offWorkTimeVacationTardy(){
        //given
        String empno = "220109";
        int onOffWork = 0;
        LocalDateTime onWork = LocalDate.of(2022,7,2).atTime(9, 0,1);
        LocalDateTime normal = LocalDate.of(2022,7,2).atTime(16, 0,0);

        //when
        attendanceCheckService.onOffWorkCheck(empno, onWork);
        String msg = attendanceCheckService.onOffWorkCheck(empno, normal);
        AttendanceTime attendanceTime = attendanceCheckMapper.findAttendanceTimeByEmpnoForTest(empno, onOffWork,normal).get();
        AttendanceStatus attendanceStatus = attendanceCheckMapper.findByEmpno(empno, LocalDate.of(2022,7,2)).get();

        //then
        assertThat(attendanceTime.getDate()).isEqualTo(normal);
        assertThat(attendanceStatus.getDate().toLocalDate()).isEqualTo(LocalDate.of(2022,7,2));
        assertThat(msg).isEqualTo(employeeMapper.findNameByempno(empno) + "(" + empno + ")님 " + "퇴근하셨습니다.");
    }

    @Test
    @DisplayName("#21 정상퇴근(퇴근 시간X)")
    public void offWorkNormalTestEarly(){
        //given
        String empno = "220109";
        int onOffWork = 0;

        LocalDateTime onWork = LocalDate.now().atTime(9, 0,0);
        LocalDateTime offWork = LocalDate.now().atTime(17, 59,59);
        //when
        attendanceCheckService.onOffWorkCheck(empno, onWork);
        String normalMsg = attendanceCheckService.onOffWorkCheck(empno, offWork);
        boolean check = attendanceCheckMapper.findAttendanceTimeByEmpno(empno, onOffWork,offWork).isEmpty();
        AttendanceStatus attendanceStatus = attendanceCheckMapper.findByEmpno(empno, LocalDate.now()).get();

        //then
        assertThat(attendanceStatus.getDate().toLocalDate()).isEqualTo(LocalDate.now());
        assertThat(attendanceStatus.getAttendance()).isEqualTo(1);
        assertThat(check).isEqualTo(true);
        assertThat(normalMsg).isEqualTo(employeeMapper.findNameByempno(empno) + "(" + empno + ")님 " + "퇴근시간이 아닙니다.");
    }

    @Test
    @DisplayName("#22 정상퇴근1")
    public void offWorkNormalTest1(){
        //given
        String empno = "220109";
        int onOffWork = 0;

        LocalDateTime onWork = LocalDate.now().atTime(9, 0,0);
        LocalDateTime offWork = LocalDate.now().atTime(18, 0,0);
        //when
        attendanceCheckService.onOffWorkCheck(empno, onWork);
        String normalMsg = attendanceCheckService.onOffWorkCheck(empno, offWork);
        AttendanceTime attendanceTime = attendanceCheckMapper.findAttendanceTimeByEmpno(empno, onOffWork,offWork).get();
        AttendanceStatus attendanceStatus = attendanceCheckMapper.findByEmpno(empno, LocalDate.now()).get();

        //then
        assertThat(attendanceTime.getDate()).isEqualTo(offWork);
        assertThat(attendanceStatus.getDate().toLocalDate()).isEqualTo(LocalDate.now());
        assertThat(attendanceStatus.getAttendance()).isEqualTo(1);
        assertThat(normalMsg).isEqualTo(employeeMapper.findNameByempno(empno) + "(" + empno + ")님 " + "퇴근하셨습니다.");
    }

    @Test
    @DisplayName("#23 정상퇴근2")
    public void offWorkNormalTest2(){
        //given
        String empno = "220109";
        int onOffWork = 0;

        LocalDateTime onWork = LocalDate.now().atTime(9, 0,0);
        LocalDateTime offWork = LocalDate.now().atTime(18, 0,1);
        //when
        attendanceCheckService.onOffWorkCheck(empno, onWork);
        String normalMsg = attendanceCheckService.onOffWorkCheck(empno, offWork);
        AttendanceTime attendanceTime = attendanceCheckMapper.findAttendanceTimeByEmpno(empno, onOffWork,offWork).get();
        AttendanceStatus attendanceStatus = attendanceCheckMapper.findByEmpno(empno, LocalDate.now()).get();

        //then
        assertThat(attendanceTime.getDate()).isEqualTo(offWork);
        assertThat(attendanceStatus.getDate().toLocalDate()).isEqualTo(LocalDate.now());
        assertThat(attendanceStatus.getAttendance()).isEqualTo(1);
        assertThat(normalMsg).isEqualTo(employeeMapper.findNameByempno(empno) + "(" + empno + ")님 " + "퇴근하셨습니다.");
    }

    @Test
    @DisplayName("#24 중복퇴근")
    public void offWorkDuplicateTest(){
        //given
        String empno = "220109";
        int onOffWork = 0;
        LocalDateTime onWork = LocalDate.now().atTime(9, 0,0);
        LocalDateTime offWork = LocalDate.now().atTime(18, 0,0);
        //when
        attendanceCheckService.onOffWorkCheck(empno, onWork);
        attendanceCheckService.onOffWorkCheck(empno, offWork);
        String duplicateMsg = attendanceCheckService.onOffWorkCheck(empno, offWork);
        AttendanceTime attendanceTime = attendanceCheckMapper.findAttendanceTimeByEmpno(empno, onOffWork,offWork).get();
        AttendanceStatus attendanceStatus = attendanceCheckMapper.findByEmpno(empno, LocalDate.now()).get();
        //then
        assertThat(attendanceTime.getDate()).isEqualTo(offWork);
        assertThat(attendanceStatus.getDate().toLocalDate()).isEqualTo(LocalDate.now());
        assertThat(attendanceStatus.getAttendance()).isEqualTo(1);
        assertThat(duplicateMsg).isEqualTo(employeeMapper.findNameByempno(empno) + "(" + empno + ")님 " + "이미 퇴근하셨습니다.");
    }

    @Test
    @DisplayName("#25 출근미등록")
    public void onWorkUnregisteredTest(){
        //given
        String empno = "220109";
        int onOffWork = 0;
        LocalDateTime offWork = LocalDate.now().atTime(18, 0,0);
        //when
        String unregisteredMsg = attendanceCheckService.onOffWorkCheck(empno, offWork);
        AttendanceTime attendanceTime = attendanceCheckMapper.findAttendanceTimeByEmpno(empno, onOffWork,offWork).get();
        AttendanceStatus attendanceStatus = attendanceCheckMapper.findByEmpno(empno, LocalDate.now()).get();
        //then
        assertThat(attendanceTime.getDate()).isEqualTo(offWork);
        assertThat(attendanceStatus.getDate().toLocalDate()).isEqualTo(LocalDate.now());
        assertThat(attendanceStatus.getAttendance()).isEqualTo(0);
        assertThat(unregisteredMsg).isEqualTo(employeeMapper.findNameByempno(empno) + "(" + empno + ")님 " + "퇴근하셨습니다.(출근 미등록)");
    }

    @Test
    @DisplayName("#26 날짜변경(퇴근)")
    public void offWorkDateChange(){
        //given
        String empno = "220109";
        int onOffWork = 0;
        LocalDateTime onWork = LocalDate.now().atTime(9, 0,0);
        LocalDateTime offWork = LocalDate.now().atTime(23, 59,59);

        //when
        attendanceCheckService.onOffWorkCheck(empno, onWork);
        String normalMsg = attendanceCheckService.onOffWorkCheck(empno, offWork);
        AttendanceTime attendanceTime = attendanceCheckMapper.findAttendanceTimeByEmpno(empno, onOffWork,offWork).get();
        AttendanceStatus attendanceStatus = attendanceCheckMapper.findByEmpno(empno, LocalDate.now()).get();

        //then
        assertThat(attendanceTime.getDate()).isEqualTo(offWork);
        assertThat(attendanceStatus.getDate().toLocalDate()).isEqualTo(LocalDate.now());
        assertThat(attendanceStatus.getAttendance()).isEqualTo(1);
        assertThat(normalMsg).isEqualTo(employeeMapper.findNameByempno(empno) + "(" + empno + ")님 " + "퇴근하셨습니다.");
    }

    @Test
    @DisplayName("#27 날짜변경1")
    public void onWorkDateChange1(){
        //given
        String empno = "220109";
        int onOffWork = 1;
        LocalDateTime onWork = LocalDate.now().atTime(0, 0,0).plusDays(1);

        //when
        String normalMsg = attendanceCheckService.onOffWorkCheck(empno, onWork);
        boolean check = attendanceCheckMapper.findAttendanceTimeByEmpno(empno, onOffWork,onWork).isEmpty();
        AttendanceStatus attendanceStatus = attendanceCheckMapper.findByEmpno(empno, LocalDate.now().plusDays(1)).get();

        //then
        assertThat(attendanceStatus.getDate().toLocalDate()).isEqualTo(LocalDate.now().plusDays(1));
        assertThat(check).isEqualTo(true);
        assertThat(attendanceStatus.getAttendance()).isEqualTo(0);
        assertThat(normalMsg).isEqualTo(employeeMapper.findNameByempno(empno) + "(" + empno + ")님 " + "출근시간이 아닙니다.");
    }

    @Test
    @DisplayName("#28 날짜변경2")
    public void onWorkDateChange2(){
        //given
        String empno = "220109";
        int onOffWork = 1;
        LocalDateTime onWork = LocalDate.now().atTime(0, 0,1).plusDays(1);

        //when
        String normalMsg = attendanceCheckService.onOffWorkCheck(empno, onWork);
        boolean check = attendanceCheckMapper.findAttendanceTimeByEmpno(empno, onOffWork,onWork).isEmpty();
        AttendanceStatus attendanceStatus = attendanceCheckMapper.findByEmpno(empno, LocalDate.now().plusDays(1)).get();

        //then
        assertThat(attendanceStatus.getDate().toLocalDate()).isEqualTo(LocalDate.now().plusDays(1));
        assertThat(check).isEqualTo(true);
        assertThat(attendanceStatus.getAttendance()).isEqualTo(0);
        assertThat(normalMsg).isEqualTo(employeeMapper.findNameByempno(empno) + "(" + empno + ")님 " + "출근시간이 아닙니다.");
    }

    @Test
    @DisplayName("#29 출근가능시간(출근 시간X)")
    public void onWorkStartEarly(){
        //given
        String empno = "220109";
        int onOffWork = 1;
        LocalDateTime onWork = LocalDate.now().atTime(4, 59,59);

        //when
        String normalMsg = attendanceCheckService.onOffWorkCheck(empno, onWork);
        boolean check = attendanceCheckMapper.findAttendanceTimeByEmpno(empno, onOffWork,onWork).isEmpty();
        AttendanceStatus attendanceStatus = attendanceCheckMapper.findByEmpno(empno, LocalDate.now()).get();

        //then
        assertThat(attendanceStatus.getDate().toLocalDate()).isEqualTo(LocalDate.now());
        assertThat(check).isEqualTo(true);
        assertThat(attendanceStatus.getAttendance()).isEqualTo(0);
        assertThat(normalMsg).isEqualTo(employeeMapper.findNameByempno(empno) + "(" + empno + ")님 " + "출근시간이 아닙니다.");
    }

    @Test
    @DisplayName("#30 출근가능시간1")
    public void onWorkStart1(){
        //given
        String empno = "220109";
        int onOffWork = 1;
        LocalDateTime normal = LocalDate.now().atTime(5, 0,0);

        //when
        String normalMsg = attendanceCheckService.onOffWorkCheck(empno, normal);
        AttendanceTime attendanceTime = attendanceCheckMapper.findAttendanceTimeByEmpno(empno, onOffWork,normal).get();
        AttendanceStatus attendanceStatus = attendanceCheckMapper.findByEmpno(empno, LocalDate.now()).get();

        //then
        assertThat(attendanceTime.getDate()).isEqualTo(normal);
        assertThat(attendanceStatus.getDate().toLocalDate()).isEqualTo(LocalDate.now());
        assertThat(attendanceStatus.getAttendance()).isEqualTo(1);
        assertThat(normalMsg).isEqualTo(employeeMapper.findNameByempno(empno) + "(" + empno + ")님 " + "출근하셨습니다.");
    }

    @Test
    @DisplayName("#31 출근가능시간2")
    public void onWorkStart2(){
        //given
        String empno = "220109";
        int onOffWork = 1;
        LocalDateTime normal = LocalDate.now().atTime(5, 0, 1);

        //when
        String normalMsg = attendanceCheckService.onOffWorkCheck(empno, normal);
        AttendanceTime attendanceTime = attendanceCheckMapper.findAttendanceTimeByEmpno(empno, onOffWork,normal).get();
        AttendanceStatus attendanceStatus = attendanceCheckMapper.findByEmpno(empno, LocalDate.now()).get();

        //then
        assertThat(attendanceTime.getDate()).isEqualTo(normal);
        assertThat(attendanceStatus.getDate().toLocalDate()).isEqualTo(LocalDate.now());
        assertThat(attendanceStatus.getAttendance()).isEqualTo(1);
        assertThat(normalMsg).isEqualTo(employeeMapper.findNameByempno(empno) + "(" + empno + ")님 " + "출근하셨습니다.");
    }

}
