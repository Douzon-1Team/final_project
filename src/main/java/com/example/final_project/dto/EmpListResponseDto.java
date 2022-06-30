package com.example.final_project.dto;

import com.example.final_project.model.Rank;
import com.example.final_project.model.Role;
import lombok.Builder;
import lombok.Getter;

import java.text.SimpleDateFormat;
import java.util.Date;

@Getter
public class EmpListResponseDto {
    String roleName;
    String deptName;
    String rankName;
    String empno;
    String extensionNum;
    String empName;
    Date hireDate;

    @Builder
    public EmpListResponseDto(String empno, String deptName, Rank rank, Role role,  String empName, String extensionNum, Date hireDate){
        this.roleName = role.getName();
        this.deptName = deptName;
        this.rankName = rank.getName();
        this.empno = empno;
        this.extensionNum = extensionNum;
        this.empName = empName;
        this.hireDate = hireDate;
    }
}


