package com.example.final_project.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Builder
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class getVacationDataDto {
    private String workStart;
    private String workEnd;
    private String workStartf;
    private String workEndf;
    private int flex;
    private int remain;
}
