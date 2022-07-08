package com.example.final_project.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Builder
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class ReqListDto {
    private String reqid;
    private String name;
    private String rank;
    private String req;
    private String startFormat1;
    private String endFormat1;
    private String startFormat2;
    private String endFormat2;
    private String comment;
    private int accept;
    private int reject;
}
