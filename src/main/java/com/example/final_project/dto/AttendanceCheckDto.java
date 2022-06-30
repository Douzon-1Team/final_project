package com.example.final_project.dto;

import lombok.Builder;
import lombok.Getter;

import java.time.LocalDateTime;


@Getter
@Builder
public class AttendanceCheckDto {
    String empno;
    String deptNo;
    int attendance;
    int tardy;
    String vacation;
    int unregistered;
    int flexible;
    LocalDateTime getToWorkTimeSet;
    LocalDateTime getOffWorkTimeSet;
    LocalDateTime getToWorkTimeSetF;
    LocalDateTime getOffWorkTimeSetF;
}
