package com.example.final_project.dto;

import lombok.*;

@Getter
@Builder
public class CalendarResponseDto { // client에게 응답
    private String empno;
    private String req;
    private boolean reject;
    private boolean accept;
    private String VacationStart;
    private String VacationEnd;
//    private String deptNo;
//    private String onwork;
//    private String offwork;
//    private boolean OnOffWork;
//    private String time;
//    private boolean attendance;
//    private boolean tardy;
//    private boolean LeaveEarly;
//    private String vacation;
//    private boolean unregistered;
//    private String date;
}
