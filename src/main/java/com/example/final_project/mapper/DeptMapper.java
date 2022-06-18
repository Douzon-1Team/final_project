package com.example.final_project.mapper;

import org.apache.ibatis.annotations.Select;

public interface DeptMapper {

    @Select("SELECT dept_name FROM dept WHERE dept_no=#{deptNo}")
    String findByDeptNo(String deptNo);

    @Select("SELECT dept_no FROM dept WHERE dept_name=#{deptName}")
    String findByDeptName(String deptName);
}
