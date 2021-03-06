package com.example.final_project.mapper;

import com.example.final_project.dto.SearchFilterRequestDto;
import com.example.final_project.model.EmpInfoComp;
import com.example.final_project.model.Employee;
import org.apache.ibatis.jdbc.SQL;

import java.util.List;

public class SqlProvider {
    public String updateEmployee(Employee emp){
        SQL sql = new SQL();
        sql.UPDATE("employee");
        if(!emp.getName().isEmpty()) sql.SET("emp_name = #{name}");
        if(emp.getProfile() != null) sql.SET("emp_profile = #{profile}");
        if(emp.getRole() != null) sql.SET("role=#{role}");
        if(emp.getPassword() != null) sql.SET("emp_pwd=#{password}");
        if(emp.isResigned()) sql.SET("resigned=true");
        sql.WHERE("empno=#{empno}");

        return sql.toString();
    }

    public String updateEmpInfoComp(EmpInfoComp emp){
        SQL sql = new SQL();
        sql.UPDATE("emp_info_comp");
        if(emp.getDeptNo() != null) sql.SET("dept_no = #{deptNo}");
        if(emp.getRank() != null) sql.SET("rank = #{rank}");
        if(!emp.getExtensionNum().isEmpty()) sql.SET("extension_num = #{extensionNum}");
        sql.WHERE("empno=#{empno}");
        return sql.toString();
    }
}
