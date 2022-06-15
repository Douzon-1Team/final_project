package com.example.final_project.dto;

//import com.example.final_project.model.Rank;
import com.example.final_project.model.Role;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

@Getter
@AllArgsConstructor
@Builder
public class EmpUpdateDto {
    private String deptName;
    private String name;
    private String extensionNum;
    private String profile;
    private Role role;
    //private Rank rank;
    private String pwd;
    private String newPwd;
    private String chkPwd;
}
