package com.example.final_project.dto;


import com.example.final_project.model.Rank;
import com.example.final_project.model.Role;
import lombok.Builder;
import lombok.Getter;

import java.util.Date;

@Builder
@Getter
public class DeptVacationDto {
    private String title;
    private String empno;
    private String name;
    private Rank rank;
    private String vacationStart;
    private String vacationEnd;
}
