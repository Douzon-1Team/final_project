package com.example.final_project.mapper;

import com.example.final_project.dto.EmpInfoDto;
import com.example.final_project.model.EmpInfoComp;
import com.example.final_project.model.Employee;
import org.apache.ibatis.jdbc.SQL;

public class SqlProvider {
    public String updateEmployee(EmpInfoDto emp){
        SQL sql = new SQL();
        sql.UPDATE("employee_info_comp");
        if(emp.getDeptName() != null) sql.SET("dept_name = #{deptName}");
        if(emp.getRank() != null) sql.SET("rank = #{rank}");
        if(emp.getExtensionNum() != null) sql.SET("extension_num = #{extensionNum}");
        if(emp.getName() != null) sql.SET("emp_name = #{name}");
        if(emp.getProfile() != null) sql.SET("emp_profile = #{profile}");

        return sql.toString();
    }


}
