package com.example.final_project.dto;


import com.example.final_project.model.Rank;
import com.example.final_project.model.Role;
import lombok.Builder;

import java.util.Date;

@Builder
public class DeptVacationDto {
    private String empno;
    private String name;
    private Rank rank;
    private Date vacationStart;
    private Date vacationEnd;
}
