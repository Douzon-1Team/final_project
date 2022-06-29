package com.example.final_project.dto;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.*;


@JsonInclude(JsonInclude.Include.NON_NULL)
@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class CalendarResponseDto { // client에게 응답
    private String empno;
    private String title;
    private boolean reject;
    private boolean accept;
    private String reason;
    private String context;
    private String vacationStart;
    private String vacationEnd;
    private String datestart;
    private String dateend;
    private String deptNo;
    private String onwork;
    private String offwork;
    private String notreqdate;
    private boolean agree;
    private boolean OnOffWork;
    private String time;
    private boolean attendance;
    private boolean tardy;
    private String etc;
    private boolean unregistered;
    private String date;
    private int totalAnnualLeave;
    private int remainingAnnualLeaveDay;
    private int remainingAnnualLeaveTime;
    private Long attendanceWeek;
    private Long overtimeWeek;
    private Long todayWorkTime;
    private String m;
    private String count;
    private String datediff;
    private String vacation;
    private String month;
}
