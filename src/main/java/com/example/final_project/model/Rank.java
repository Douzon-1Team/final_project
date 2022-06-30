package com.example.final_project.model;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.AllArgsConstructor;
import lombok.Getter;

@JsonFormat(shape = JsonFormat.Shape.OBJECT)
@Getter
@AllArgsConstructor
public enum Rank {
    STAFF("사원"), SENIOR_STAFF("주임"), ASSISTANT_MANAGER("대리"),
    GENERAL_MANAGER("과장"), DEPUTY_MANAGER("차장"), SUPERVISOR("부장"),
    EXECUTIVE("임원");

    private String name;
}
