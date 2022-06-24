package com.example.final_project.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
@Getter
@AllArgsConstructor
@Builder
public class VacationRequestDto {
    private String empNo;
    private String req;
    private String startFormat;
    private String endFormat;
    private String comment;
}
