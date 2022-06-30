package com.example.final_project;

import com.example.final_project.dto.AttendanceCheckDto;
import com.example.final_project.mapper.AttendanceCheckMapper;
import com.example.final_project.service.AttendanceCheckService;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mybatis.spring.boot.test.autoconfigure.MybatisTest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.test.context.junit.jupiter.SpringExtension;

import static org.junit.jupiter.api.Assertions.*;
import static org.assertj.core.api.Assertions.*;

import java.time.LocalDateTime;
import java.time.LocalTime;

@MybatisTest
@ExtendWith(SpringExtension.class)
@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.NONE) // 실제 DB 연결 테스트
public class AttendanceCheckIntegrationTest {

    AttendanceCheckService attendanceCheckService;

    @Test
    public void onOffWorkCheck() throws Exception {
        //given
        String empno = "220109";
        LocalDateTime normal = LocalDateTime.of(2022,6,30,8,59,59);
        LocalDateTime tardy = LocalDateTime.of(2022,6,3,9,00,1);
        //when
        String normalMsg = attendanceCheckService.onOffWorkCheck(empno, normal);
        //String tardyMsg = attendanceCheckService.onOffWorkCheck(empno, tardy);

        //then
        assertThat(normalMsg).isEqualTo("출근");
        //assertThat(tardyMsg).isEqualTo("지각입니다.");

    }


}
