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
        LocalTime onWork = LocalTime.of(8,59,59,0);
        LocalTime onWorkLate = LocalTime.of(9,10,1,0);
        LocalTime settingTime = LocalTime.of(9,0,0,0);

        //when
        attendanceCheckService.tardyCheck(onWorkLate,settingTime, "220101");
        attendanceCheckService.tardyCheck(onWork,settingTime, "220101");
        //then

    }

    @Test
    @DisplayName("중복체크 점검")
    public void duplicationCheck() throws Exception {
        //given
        //null 객체인 경우
        Optional<AttendanceTime> notDuplicated = Optional.empty();
        //정상 객체인 경우
        Optional<AttendanceTime> duplicated;

        //when
        attendanceCheckService.duplicationCheck("220101",0);

        //then
    }



}