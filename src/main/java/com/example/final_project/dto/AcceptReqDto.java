package com.example.final_project.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

@Getter
@AllArgsConstructor
@Builder
public class AcceptReqDto {
    private String reqid;
    private String empNo;
    private int minusHours;
}
