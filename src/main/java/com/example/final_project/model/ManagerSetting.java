package com.example.final_project.model;

import lombok.Builder;
import lombok.Getter;

import java.sql.Time;

@Getter
@Builder
public class ManagerSetting {
    String deptNo;
    Time getToWorkTimeSet;
    Time getOffWorkTimeSet;
    Time getToWorkTimeSetF;
    Time getOffWorkTimeSetF;
}
