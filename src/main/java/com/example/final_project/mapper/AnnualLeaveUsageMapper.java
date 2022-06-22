package com.example.final_project.mapper;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;
@Mapper
public interface AnnualLeaveUsageMapper {
    @Select("select 15 + if(year(created_at) = year(now()),0,floor(((TIMESTAMPDIFF(YEAR , created_at, now()))-1)/2)) 연차일수 from employee where empno = #{empno}")
    int totalAnnualLeave(String empno);
    @Select("select FLOOR( remaining_annual_leave/8 ) from emp_info_comp where empno = 220101;")
    int remainingAnnualLeaveDay(String empno);
    @Select("select remaining_annual_leave%8 from emp_info_comp where empno = #{empno}")
    int remainingAnnualLeaveTime(String empno);
}
