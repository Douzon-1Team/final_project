package com.example.final_project.dto;

import lombok.Builder;
import lombok.Getter;

import java.time.LocalDate;

@Getter
@Builder
public class AttendanceUpdateDto {
    String empno;
    String columns;
    String values;
    LocalDate date;
}
