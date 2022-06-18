package com.example.final_project.model;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public enum Code {

    UNKNOWN_ERROR(1001, "토큰이 존재하지 않습니다."),
    WRONG_TYPE_TOKEN(1002, "변조된 토큰입니다."),
    EXPIRED_TOKEN(1003, "만료된 토큰입니다."),
    ACCESS_DENIED(1004, "권한이 없습니다."),
    CALENDAR_VACATION_ERROR(3001, "바보"),
    CALENDAR_WORK_ERROR(3002, "멍청이");

    private int code;
    private String message;

}
