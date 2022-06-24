package com.example.final_project.mapper;

import com.example.final_project.dto.VacationRequestDto;
import org.apache.ibatis.annotations.Insert;

import java.util.List;

public interface VacationMapper {

    @Insert("INSERT INTO attendance_req(empno, req, context, vacation_start, vacation_end)"+
    "VALUES(#{empNo},#{req}, #{comment},#{startFormat},#{endFormat})")
    int save(VacationRequestDto dto);
}
