package com.example.final_project.dto;

import com.example.final_project.model.AttendanceReq;
import com.example.final_project.model.AttendanceTime;
import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.Optional;


@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@JsonInclude(JsonInclude.Include.NON_NULL)
public class AttendanceCheckDto {
    String empno;
    String deptNo;
    int attendance;
    int tardy;
    String etc;
    int unregistered;
    int flexible;
    LocalDateTime getToWorkTimeSet;
    LocalDateTime getOffWorkTimeSet;
    LocalDateTime getToWorkTimeSetF;
    LocalDateTime getOffWorkTimeSetF;
    LocalDateTime date;
    LocalDateTime vacationStart;
    LocalDateTime vacationEnd;
}
