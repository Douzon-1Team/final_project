package com.example.final_project.dto;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class AnnualLeaveUsageDto {

    private int totalAnnualLeave;
    private int remainingAnnualLeaveDay;
    private int remainingAnnualLeaveTime;

}
