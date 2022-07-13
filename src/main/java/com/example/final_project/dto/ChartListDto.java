package com.example.final_project.dto;

import lombok.Builder;
import lombok.Getter;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Getter
@Builder
public class ChartListDto {
    private String empno;
    private String empName;
    private String etc;
    private LocalDateTime start;
    private LocalDateTime end;
    private LocalDate date;

}
