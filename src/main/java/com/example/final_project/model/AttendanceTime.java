package com.example.final_project.model;

import lombok.Builder;
import lombok.Getter;

import java.util.Date;

@Getter
@Builder
public class AttendanceTime {
    public String empno;
    public Date date;
    public String time;
    public boolean OnOffWork;
}
