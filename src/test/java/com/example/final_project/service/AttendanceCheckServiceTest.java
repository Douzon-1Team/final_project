package com.example.final_project.service;

import org.junit.jupiter.api.*;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.junit.jupiter.MockitoExtension;

import java.time.LocalTime;

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