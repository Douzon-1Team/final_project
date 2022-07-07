package com.example.final_project.dto;

import lombok.Builder;
import lombok.Getter;

@Builder
@Getter
public class DeptVacationStatusDto {
    private String deptNo;
    private String empno;
    private String empName;
    private String remainDay;
    private String remainHour;
}