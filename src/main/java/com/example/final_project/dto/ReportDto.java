package com.example.final_project.dto;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@JsonInclude(JsonInclude.Include.NON_NULL)
@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ReportDto {
    private String empno;
    private String name;
    private String rank;
    private int deptNo;
    private String etc;
    private int m;
    private int count;
    private int sort;
    private String onofftime;
    private int onofftimenum;
    private int totaltime;
    private boolean onOffWork;
    private String deptName;

}
