package com.example.final_project.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

import java.util.Date;

@Getter
@AllArgsConstructor
@Builder
public class EmpInfoComp {
    private String empno;
    private String deptno;
    private Rank rank;
    private String email;
    private String extensionNUm;
    private Date hireDate;
}
