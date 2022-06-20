package com.example.final_project.dto;

import com.example.final_project.model.EmpInfoComp;
import com.example.final_project.model.Employee;
import com.example.final_project.model.Rank;
import com.example.final_project.model.Role;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.web.multipart.MultipartFile;

import java.util.Date;

@Getter
@AllArgsConstructor
@Builder
public class EmpInfoDto {
    private String deptName;
    private String name;
    private String extensionNum;
    private MultipartFile profile;
    private Role role;
    private Rank rank;
    private Date hireDate;

    public static Employee toEmployee(EmpInfoDto emp, String empno, String profileUrl, String pwd, String qrUrl){
       return  Employee.builder()
                .name(emp.getName())
                .profile(profileUrl)
                .role(emp.getRole())
                .password(pwd)
                .empno(empno)
                .qr(qrUrl)
                .build();
    }

    public static EmpInfoComp toEmpInfoComp(EmpInfoDto emp, String empno, String deptNo, String email){
        return EmpInfoComp.builder()
                .empno(empno)
                .deptNo(deptNo)
                .email(email)
                .rank(emp.getRank())
                .hireDate(emp.getHireDate())
                .extensionNum(emp.getExtensionNum())
                .build();
    }
}
