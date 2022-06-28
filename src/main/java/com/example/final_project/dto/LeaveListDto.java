package com.example.final_project.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Builder
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class LeaveListDto {
    private int reqid; // attendance_req
    private String deptName;
    private String name;
    private String req; // attendance_req
    private String vacationstart; // attendance_req
    private String vacationend; // attendance_req
    private String context; // attendance_req
    private int reject; // attendance_req
    private int accept; // attendance_req
    private String reason; // attendance_req
}
