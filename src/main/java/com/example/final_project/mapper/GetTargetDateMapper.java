package com.example.final_project.mapper;

import com.example.final_project.dto.GetTargetDateDto;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;

import java.util.List;

@Mapper
public interface GetTargetDateMapper {
    @Select("SELECT att_stat_id attstatid, agree, etc FROM attendance_status WHERE date(date)=#{date} AND empno=#{empNo}")
    List<GetTargetDateDto> targetdate(String empNo, String date);
}
