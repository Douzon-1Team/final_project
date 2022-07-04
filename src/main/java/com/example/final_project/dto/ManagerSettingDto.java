package com.example.final_project.dto;

import com.example.final_project.model.ManagerSetting;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.sql.Time;
import java.time.LocalTime;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ManagerSettingDto {
    private String empno;
    private String deptNo;
    private String flexible;
    private String graph;
    private LocalTime getToWorkTimeSet;
    private LocalTime getOffWorkTimeSet;
    private LocalTime getToWorkTimeSetF;
    private LocalTime getOffWorkTimeSetF;

    public static ManagerSetting toTimeSetting(ManagerSettingDto managerSettingDto,
                                               Time getToWorkTimeSet, Time getOffWorkTimeSet,
                                               Time getToWorkTimeSetF, Time getOffWorkTimeSetF) {
        return ManagerSetting.builder()
                .deptNo(managerSettingDto.getDeptNo())
                .getToWorkTimeSet(getToWorkTimeSet)
                .getOffWorkTimeSet(getOffWorkTimeSet)
                .getToWorkTimeSetF(getToWorkTimeSetF)
                .getOffWorkTimeSetF(getOffWorkTimeSetF)
                .build();
    }

    public static ManagerSetting toGraphSetting(ManagerSettingDto managerSettingDto, String graph) {
        return ManagerSetting.builder()
                .deptNo(managerSettingDto.getDeptNo())
                .chartStat(graph)
                .build();
    }
}
