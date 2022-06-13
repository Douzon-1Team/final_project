package com.example.final_project.mapper;

import com.example.final_project.model.Employee;
import org.apache.ibatis.annotations.*;

import java.util.Optional;

public interface EmployeeMapper {

    @Insert("INSERT INTO employee(empno, emp_name, emp_pwd, role, qr_code_url, emp_profile) " +
            "values(#{empno}, #{name}, #{password}, #{role}, #{qr}, #{profile})")
    int save(Employee employee);

    @Results(id = "employee", value = {
            @Result(property = "name", column = "emp_name"),
            @Result(property = "password", column = "emp_pwd"),
            @Result(property = "profile", column = "emp_profile"),
            @Result(property = "qr", column = "qr_code_url")
    })
    @Select("SELECT * FROM employee WHERE empno=#{user_id}")
    Optional<Employee> findByUserId(@Param("user_id") String userId);
}
