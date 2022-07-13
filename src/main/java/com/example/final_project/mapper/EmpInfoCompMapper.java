package com.example.final_project.mapper;

import com.example.final_project.model.EmpInfoComp;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;
import org.apache.ibatis.annotations.UpdateProvider;

import java.util.Optional;
@Mapper
public interface EmpInfoCompMapper {

    @Insert("INSERT INTO emp_info_comp(empno, dept_no, rank, email, extension_num) " +
            "VALUES(#{empno}, #{deptNo}, #{rank}, #{email}, #{extensionNum})")
    int save(EmpInfoComp empInfoComp);

    @Select("select empno from emp_info_comp where dept_no = #{deptNo} and left(empno, 2) = #{year} order by empno desc limit 1;")
    String findLastEmpno(String deptNo, int year);

    @Select("SELECT * FROM emp_info_comp WHERE empno=#{empno}")
    Optional<EmpInfoComp> findByEmpno(String empno);

    @UpdateProvider(type=SqlProvider.class, method = "updateEmpInfoComp")
    int updateByEmpno(EmpInfoComp empInfoComp);

    @Select("UPDATE emp_info_comp SET flexible=#{flexible} WHERE empno=#{empno}")
    String updateFlexible(String empno, String flexible);

    @Select("SELECT dept_no FROM emp_info_comp WHERE empno=#{empno}")
    String findDeptNo(String empno);
}
