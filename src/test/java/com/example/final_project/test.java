package com.example.final_project;

import com.example.final_project.dto.AttendanceCheckDto;
import com.example.final_project.mapper.AttendanceCheckMapper;
import com.example.final_project.model.ManagerSetting;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mybatis.spring.boot.test.autoconfigure.MybatisTest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.test.context.junit.jupiter.SpringExtension;

import static org.assertj.core.api.Assertions.assertThat;


@MybatisTest
@ExtendWith(SpringExtension.class)
@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.NONE) // 실제 DB 연결 테스트
public class test {
    @Autowired
    private AttendanceCheckMapper attendanceCheckMapper;

    @Test
    @DisplayName("MyBatis 연결 테스트")
    public void AnnualLeaveUsageTest () throws Exception {
        //given

        //when
        AttendanceCheckDto b = attendanceCheckMapper.timeCheck("220101");
        //then
        //assertThat(total).isEqualTo(4);
        System.out.println("Tlqkffusk"+b.getGetToWorkTimeSet());

    }
}
