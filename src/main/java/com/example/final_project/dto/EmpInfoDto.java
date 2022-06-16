package com.example.final_project.dto;

import com.example.final_project.model.EmpInfoComp;
import com.example.final_project.model.Employee;
import com.example.final_project.model.Rank;
import com.example.final_project.model.Role;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

import java.util.Date;

@Getter
@AllArgsConstructor
@Builder
public class EmpInfoDto {
    private String deptName;
    private String name;
    private String extensionNum;
    private String profile;
    private Role role;
    private Rank rank;
    private Date hireDate;

    public static Employee toEmployee(EmpInfoDto emp, String empno, String pwd, String qr){
       return  Employee.builder()
                .name(emp.getName())
                .profile(emp.getProfile())
                .role(emp.getRole())
                .password(pwd)
                .empno(empno)
                .qr(qr)
                .build();
    }

    public static EmpInfoComp toEmpInfoComp(EmpInfoDto emp, String empno, String deptNo, String email){
        return EmpInfoComp.builder()
                .empno(empno)
                .deptno(deptNo)
                .email(email)
                .rank(emp.getRank())
                .hireDate(emp.getHireDate())
                .extensionNUm(emp.getExtensionNum())
                .build();
    }
}
