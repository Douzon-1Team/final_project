package com.example.final_project.dto;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;


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
    String req;
    LocalDateTime getToWorkTimeSet;
    LocalDateTime getOffWorkTimeSet;
    LocalDateTime getToWorkTimeSetF;
    LocalDateTime getOffWorkTimeSetF;
    LocalDateTime date;
    LocalDateTime vacationStart;
    LocalDateTime vacationEnd;
}
