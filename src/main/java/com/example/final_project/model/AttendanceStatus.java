package com.example.final_project.model;

import lombok.Builder;
import lombok.Getter;

import java.time.LocalDateTime;

@Getter
@Builder
public class AttendanceStatus {
    String AttStatId;
    String empno;
    String deptNo;
    int attendance;
    int tardy;
    int leaveEarly;
    String etc;
    int unregistered;
    LocalDateTime date;
}
