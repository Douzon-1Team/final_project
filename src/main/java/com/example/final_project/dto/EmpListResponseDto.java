package com.example.final_project.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.Date;

@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class EmpListResponseDto {
    String role;
    String deptName;
    String rank;
    String empno;
    String extensionNum;
    Date hireDate;
}


