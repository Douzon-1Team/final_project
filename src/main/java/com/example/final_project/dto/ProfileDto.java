package com.example.final_project.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

@Getter
@AllArgsConstructor
@Builder
public class ProfileDto {
    private String deptName;
    private String name;
    private String rankName;
    private String extensionNum;
    private String profilePath;
    private String qrPath;
}
