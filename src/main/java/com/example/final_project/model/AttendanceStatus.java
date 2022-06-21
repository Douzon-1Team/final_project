package com.example.final_project.model;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class AttendanceStatus {
    public String empno;
    public String attendance;
    public String vacation;
    public boolean tardy;
    public boolean leaveEarly;
    public boolean unregistered;
}
