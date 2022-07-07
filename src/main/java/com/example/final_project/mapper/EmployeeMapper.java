package com.example.final_project.mapper;

import com.example.final_project.model.Employee;
import org.apache.ibatis.annotations.*;

import java.util.List;
import java.util.Optional;

@Mapper
public interface EmployeeMapper {

    @Insert("INSERT INTO employee(empno, emp_name, emp_pwd, role, qr_code_url, emp_profile) " +
            "VALUES(#{empno}, #{name}, #{password}, #{role}, #{qr}, #{profile})")
    int save(Employee employee);

    @Results(id = "employee", value = {
            @Result(property = "name", column = "emp_name"),
            @Result(property = "password", column = "emp_pwd"),
            @Result(property = "profile", column = "emp_profile"),
            @Result(property = "qr", column = "qr_code_url")
    })
    @Select("SELECT * FROM employee WHERE empno=#{user_id}")
    Optional<Employee> findByUserId(@Param("user_id") String userId);

    @Select("SELECT emp_pwd FROM employee WHERE empno=#{empno}")
    Optional<String> findPasswordByEmpno(String empno);

    @Select("SELECT empno FROM employee WHERE empno NOT LIKE '%admin%'")
    List<String> findAllEmpNo();

    @Select("select dept_no from emp_info_comp where empno = #{empno}")
    String findDeptNoByempno(String empno);

    @Select("select emp_name from employee where empno = #{empno}")
    String findNameByempno(String empno);

    @Select("SELECT empno FROM emp_info_comp WHERE empno NOT LIKE '%admin%' and dept_no = #{deptNo}")
    List<String> findEmpNoByDept(String deptNo);

    @UpdateProvider(type=SqlProvider.class, method="updateEmployee")
    int updateByEmpno(Employee employee);

    @Update("UPDATE employee SET emp_pwd = #{password} where empno=#{empno}")
    int updatePwd(Employee employee);

    @Update("UPDATE employee SET emp_profile = #{profile} where empno=#{empno}")
    int updateImg(Employee employee);

    @Delete("DELETE FROM employee WHERE empno=#{empno}")
    int remove(String empno);

    //유저의 권한 확인
    @Select("SELECT role FROM employee WHERE empno=#{empno}")
    String findByUserRole(String empno);
}
