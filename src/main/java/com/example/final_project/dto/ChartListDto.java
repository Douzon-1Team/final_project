package com.example.final_project.dto;

import lombok.Getter;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Getter
public class ChartListDto {
    private String empno;
    private String empName;
    private String etc;
    private String start;
    private String end;
    private LocalDate date;

    public ChartListDto(String empno, String empName, String etc, LocalDate date, LocalDateTime start, LocalDateTime end){
        this.empno = empno;
        this.empName = empName;
        this.etc = etc;
        if(date == null) this.date = start.toLocalDate();
        else this.date = date;

        //값이 아예 없으면 00:00:00 넣기
        if(start == null || end == null) {
            if (start == null) this.start = "00:00:00";
            if (end == null) this.end = "00:00:00";
        }

        //오전반차, 오후반차, 휴가는 날짜만 필요함
        else if(etc.contains("반차") || etc.equals("휴가")){
            this.start = start.toLocalTime().toString();
            this.end = end.toLocalTime().toString();
        }

        //나머지는 시간만 필요함
        else{
            this.start = start.toLocalTime().toString();
            this.end = end.toLocalTime().toString();
        }

    }

}
