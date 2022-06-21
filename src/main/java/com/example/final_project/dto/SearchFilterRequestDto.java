package com.example.final_project.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

import java.util.Date;
import java.util.List;

@Getter
@Builder
@AllArgsConstructor
public class SearchFilterRequestDto {
    List<String> role;
    List<String> deptName;
    List<String> rank;
    Date startDate;
    Date endDate;
}
