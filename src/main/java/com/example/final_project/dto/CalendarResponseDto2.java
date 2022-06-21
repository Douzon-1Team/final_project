package com.example.final_project.dto;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class CalendarResponseDto2 {
    private String deptNo;
    private String onwork;
    private String offwork;
    private boolean OnOffWork;
    private String time;
    private boolean attendance;
    private boolean tardy;
    private boolean LeaveEarly;
    private String vacation;
    private boolean unregistered;
    private String date;
}
