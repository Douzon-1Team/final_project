package com.example.final_project.model;

import lombok.Builder;
import lombok.Getter;

import java.util.Date;

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
    Date date;
}
