package com.example.final_project.mapper;

import com.example.final_project.model.EmpInfoComp;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Select;

import java.util.Optional;

public interface EmpInfoCompMapper {

    @Insert("INSERT INTO emp_info_comp(empno, dept_no, rank, email, extension_num, hire_date" +
            "VALUES(#{empno}, #{deptNo}, #{rank}, #{email}, #{extensionNum}, #{hireDate}")
    int save(EmpInfoComp empInfoComp);

    @Select("SELECT COUNT(*) FROM emp_info_comp e " +
            "WHERE YEAR(e.hire_date) = #{year} AND dept_no = #{deptno}")
    int count(String deptno, int year);

    @Select("SELECT * FROM emp_info_comp WHERE empno=#{empno}")
    Optional<EmpInfoComp> findByEmpno(String empno);

    @Select("SELECT dept_no FROM dept WHERE dept_name= #{deptName}")
    String findByDeptName(String deptName);
}
