package com.example.final_project.model;

import lombok.Builder;
import lombok.Getter;

import java.util.Date;

@Getter
@Builder
public class EmpInfoComp {
    private String empno;
    private String deptNo;
    private Rank rank;
    private String email;
    private String extensionNum;
    private Date hireDate;
    private int remainingAnnualLeave;
    private int flexible;
}
