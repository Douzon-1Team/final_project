package com.example.final_project.model;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public enum Role {
    ROLE_ADMIN("관리자"), ROLE_MANAGER("근태 관리자"), ROLE_USER("일반 사원");

    private String name;
}
