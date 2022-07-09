package com.example.final_project.dto;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
//@JsonInclude(JsonInclude.Include.NON_NULL)
public class GetTargetDateDto {
    private int attstatid;
    private String etc;
    private int agree;

    @Builder
    public GetTargetDateDto(int attstatid, int agree, String etc){
        this.attstatid = attstatid;
        this.etc = etc;
        this.agree = agree;
    }
}
