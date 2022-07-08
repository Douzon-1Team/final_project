package com.example.final_project.mapper;

import com.example.final_project.dto.AcceptReqEmpNoDto;
import org.apache.ibatis.annotations.Select;

import java.util.List;

public interface AcceptReqEmpNoMapper {
    @Select("SELECT empno coEmpNo FROM emp_info_comp WHERE dept_no IN (SELECT dept_no FROM emp_info_comp WHERE empno=#{empNo})")
    List<AcceptReqEmpNoDto> getEmpNo(String empno);
}
