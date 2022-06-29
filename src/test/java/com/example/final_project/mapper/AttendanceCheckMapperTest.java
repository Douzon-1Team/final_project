package com.example.final_project.mapper;

import com.example.final_project.dto.AttendanceUpdateDto;
import com.example.final_project.model.AttendanceTime;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mybatis.spring.boot.test.autoconfigure.MybatisTest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.test.context.junit.jupiter.SpringExtension;

import java.time.LocalDateTime;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.assertj.core.api.Assertions.*;

@MybatisTest
@ExtendWith(SpringExtension.class)
@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.NONE) // 실제 DB 연결 테스트
class AttendanceCheckMapperTest {

    @Autowired
    AttendanceCheckMapper attendanceCheckMapper;

    @Test
    @DisplayName("중복체크 점검")
    public void duplicationChecker() throws Exception {
        //given
        Optional<AttendanceTime> notDuplicated = Optional.empty();

        //when
        Optional<AttendanceTime> attendanceTime = attendanceCheckMapper.duplicatedCheck("220101",1);
        Optional<AttendanceTime> attendanceTimeNull = attendanceCheckMapper.duplicatedCheck("220101",3);

        //then
        assertThat(attendanceTime).isNotEqualTo(notDuplicated);
        assertTrue(attendanceTime.isPresent());
        assertThat(attendanceTimeNull).isEqualTo(notDuplicated);
    }

    @Test
    @DisplayName("출퇴근 기록 점검")
    public void attendanceCheck() throws Exception {
        //given
        String empno = "220101";
        String depNo = empno.substring(2, 4);
        LocalDateTime date = LocalDateTime.now();
        AttendanceTime attendanceTime = AttendanceTime.builder().empno(empno).deptNo(depNo).date(date).onOffWork(1).build();
        //when
        attendanceCheckMapper.attendanceCheck(attendanceTime);
        //then
    }

    @Test
    @DisplayName("근태 상황 업데이트")
    public void attendanceProblemTest() throws Exception {
        //given
        String empno = "220101";
        String columns = "tardy";
        String values = "1";
        AttendanceUpdateDto attendanceUpdateDto = AttendanceUpdateDto.builder().empno(empno).columns(columns).values(values).build();
        //when
        attendanceCheckMapper.attendanceProblem(attendanceUpdateDto);
        //then

    }
}