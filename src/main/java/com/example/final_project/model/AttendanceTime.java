package com.example.final_project.model;

import lombok.Builder;
import lombok.Getter;
import java.time.LocalDateTime;

@Getter
@Builder
public class AttendanceTime {
    String attTimeId;
    String empno;
    String deptNo;
    LocalDateTime date;
    Long time;
    int onOffWork;
}
