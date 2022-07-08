package com.example.final_project.dto;

import lombok.Builder;
import lombok.Getter;

import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;

@Getter
public class AttendanceProblemDto {
    private String empno;
    private String name;
    private String etc;
    private LocalTime start;
    private LocalTime end;
    private LocalDate date;

    @Builder
    public AttendanceProblemDto(String empno, String empName, String etc, LocalDateTime start, LocalDateTime end){
        this.empno = empno;
        this.name = empName;
        this.etc = etc;
        this.date = start.toLocalDate();

        if(start == null) this.start = LocalTime.of(0,0,0);
        else this.start = start.toLocalTime();

        if(end == null) this.end = LocalTime.of(0,0,0);
        else this.end = end.toLocalTime();
    }
}
