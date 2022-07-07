package com.example.final_project.mapper;

import com.example.final_project.dto.EmpListResponseDto;
import org.apache.ibatis.annotations.Select;

import java.util.List;

public interface AdminMapper {

    @Select("Select employee.empno, dept_name, rank, role, emp_name, extension_num, hire_date FROM employee " +
            "INNER JOIN emp_info_comp ON employee.empno = emp_info_comp.empno " +
            "INNER JOIN dept ON emp_info_comp.dept_no = dept.dept_no " +
            "WHERE employee.resigned = 0")
    List<EmpListResponseDto> findByNotResigned();
}
