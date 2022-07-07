package com.example.final_project.service;

import com.example.final_project.model.AttendanceTime;
import org.junit.jupiter.api.*;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.junit.jupiter.MockitoExtension;

import java.time.LocalTime;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.assertj.core.api.Assertions.*;

@ExtendWith(MockitoExtension.class)
class AttendanceCheckServiceTest {
    @InjectMocks
    AttendanceCheckService attendanceCheckService;

    @Test
    @DisplayName("지각 체크 테스트")
    public void tardyCheckTest() throws Exception {

        //given
        String empno = "220109";
        LocalTime onWork = LocalTime.of(8,59,59,0);
        LocalTime onWorkLate = LocalTime.of(9,10,1,0);
        LocalTime settingTime = LocalTime.of(9,0,0,0);

        //when
        //then

    }


}