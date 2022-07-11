package com.example.final_project.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

@Getter
@AllArgsConstructor
@Builder
public class AcceptReqDto2 {
    private String reqid;
    private String empNo;
    private String start;
    private String end;
    private String temp;
}
