package com.example.final_project.model;

import lombok.Getter;

import java.time.LocalDateTime;

@Getter
public class AttendanceReq {
    String reqId;
    String empno;
    String req;
    String context;
    int reject;
    int accept;
    String Reason;
    LocalDateTime vacationStart;
    LocalDateTime vacationEnd;
    LocalDateTime attReqStart;
    LocalDateTime attReqEnd;
}
