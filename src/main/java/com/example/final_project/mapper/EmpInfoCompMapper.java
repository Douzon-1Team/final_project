package com.example.final_project.mapper;

import com.example.final_project.model.EmpInfoComp;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Select;
import org.apache.ibatis.annotations.UpdateProvider;

import java.util.Optional;

public interface EmpInfoCompMapper {

    @Insert("INSERT INTO emp_info_comp(empno, dept_no, rank, email, extension_num) " +
            "VALUES(#{empno}, #{deptNo}, #{rank}, #{email}, #{extensionNum})")
    int save(EmpInfoComp empInfoComp);

    @Select("SELECT COUNT(*) FROM emp_info_comp e " +
            "WHERE DATE_FORMAT(e.hire_date, '%y') = #{year} AND dept_no = #{deptNo}")
    int countByDeptNo(String deptNo, int year);

    @Select("SELECT * FROM emp_info_comp WHERE empno=#{empno}")
    Optional<EmpInfoComp> findByEmpno(String empno);

    @UpdateProvider(type=SqlProvider.class, method = "updateEmpInfoComp")
    int updateByEmpno(EmpInfoComp empInfoComp);
}
