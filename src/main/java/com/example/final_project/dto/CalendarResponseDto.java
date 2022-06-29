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

//    @Builder(builderClassName = "workBuilder", builderMethodName = "workBuilder")
//    public CalendarResponseDto(String empno, String req, boolean reject, boolean accept, String vacationStart, String vacationEnd) {
//        this.empno = empno;
//        this.req = req;
//        this.reject = reject;
//        this.accept = accept;
//        this.vacationStart = vacationStart;
//        this.vacationEnd = vacationEnd;
//    }

//    @Builder(builderClassName = "vacationBuilder", builderMethodName = "vacationBuilder")
//    public CalendarResponseDto(String deptNo, String onwork, String offwork, boolean onOffWork, String time, boolean attendance, boolean tardy, boolean leaveEarly, String vacation, boolean unregistered, String date) {
//        this.deptNo = deptNo;
//        this.onwork = onwork;
//        this.offwork = offwork;
//        OnOffWork = onOffWork;
//        this.time = time;
//        this.attendance = attendance;
//        this.tardy = tardy;
//        LeaveEarly = leaveEarly;
//        this.vacation = vacation;
//        this.unregistered = unregistered;
//        this.date = date;
//    }
}
