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


    WRONG_PASSWORD(2001, "비밀번호가 틀렸습니다."),
    MISMATCH_PASSWORD(2002, "새비밀 번호가 일치하지 않습니다."),
    SAME_PASSWORD(2003, "이전 비밀번호와 같은 비밀번호는 사용이 불가합니다."),

    CALENDAR_VACATION_ERROR(3001, "바보"),
    CALENDAR_WORK_ERROR(3002, "멍청이");

    private int code;
    private String message;

}
