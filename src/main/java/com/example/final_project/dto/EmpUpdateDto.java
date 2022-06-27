package com.example.final_project.dto;

import com.example.final_project.model.EmpInfoComp;
import com.example.final_project.model.Employee;
import com.example.final_project.model.Rank;
import com.example.final_project.model.Role;
import lombok.*;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class EmpUpdateDto {
    private String empno;
    private String deptName;
    private String name;
    private String extensionNum;
    private String profile;
    private Role role;
    private Rank rank;
    private String pwd;
    private String newPwd;
    private String chkPwd;
    private boolean isResigned;

    public static Employee toEmployee(EmpUpdateDto emp, String pwd, String profileUrl){
        return Employee.builder()
                .empno(emp.getEmpno())
                .name(emp.getName())
                .profile(profileUrl)
                .role(emp.getRole())
                .password(pwd)
                .isResigned(emp.isResigned())
                .build();
    }

    public static Employee toEmployeePwd(EmpUpdateDto emp, String pwd){
        return Employee.builder()
                .empno(emp.getEmpno())
                .password(pwd)
                .isResigned(emp.isResigned())
                .build();
    }

    public static Employee toEmployeeImg(EmpUpdateDto emp, String profile){
        return Employee.builder()
                .empno(emp.getEmpno())
                .profile(profile)
                .isResigned(emp.isResigned())
                .build();
    }

    public static EmpInfoComp toEmpInfoComp(EmpUpdateDto emp, String deptNo){
        return EmpInfoComp.builder()
                .empno(emp.getEmpno())
                .deptNo(deptNo)
                .extensionNum(emp.getExtensionNum())
                .rank(emp.getRank())
                .build();
    }
}
