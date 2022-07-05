package com.example.final_project.dto;

import com.example.final_project.model.Rank;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class DeptMemberListDto {
    private String empProfile;
    private String empno;
    private String name;
    private Rank rank;
    private String extensionNum;
    private String email;
    private String deptNo;
    private String deptName;
    private boolean attendance;
    private boolean tardy;
    private String etc;
    private boolean unregistered;
}
