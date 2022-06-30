package com.example.final_project.dto;

import com.example.final_project.model.AttendanceReq;
import com.example.final_project.model.AttendanceTime;
import lombok.Builder;
import lombok.Getter;

import java.time.LocalDateTime;
import java.util.Optional;


@Getter
@Builder
public class AttendanceCheckDto {
    String empno;
    String deptNo;
    int attendance;
    int tardy;
    String etc;
    int unregistered;
    LocalDateTime date;
    int flexible;
    LocalDateTime getToWorkTimeSet;
    LocalDateTime getOffWorkTimeSet;
    LocalDateTime getToWorkTimeSetF;
    LocalDateTime getOffWorkTimeSetF;

}
