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
        if(emp.getName() != null) sql.SET("emp_name = #{name}");
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
        if(emp.getExtensionNum() != null) sql.SET("extension_num = #{extensionNum}");
        if(emp.getRank() != null) sql.SET("rank=#{rank}");
        sql.WHERE("empno=#{empno}");
        return sql.toString();
    }

    public String selectEmployee(SearchFilterRequestDto dto, List<String> deptNo){
        SQL sql = new SQL();
        sql.SELECT("role, emp_name, employee.empno, rank, hire_date, extension_num, dept_name");
        sql.FROM("employee");
        sql.INNER_JOIN("emp_info_comp on employee.empno = emp_info_comp.empno");
        sql.INNER_JOIN("dept on dept.dept_no = emp_info_comp.dept_no");
        if(dto.getRole() != null) sql.WHERE("role in" +forEach(dto.getRole()));
        if(!deptNo.isEmpty()) sql.WHERE("dept_no in" +forEach(dto.getDeptName()));
        if(dto.getRank() != null) sql.WHERE("rank in"+forEach(dto.getRank()));
        if(dto.getStartDate() != null && dto.getEndDate() != null)
            sql.WHERE("hireDate BETWEEN "+dto.getStartDate()+" AND "+dto.getEndDate());
        return sql.toString();
    }

    public String findAllDeptNo(List<String> deptName){
        SQL sql = new SQL();
        sql.SELECT("dept_no");
        sql.FROM("dept");
        sql.WHERE("dept_name in"+forEach(deptName));
        return sql.toString();
    }

    public String forEach(List<String> param){
        StringBuilder sb = new StringBuilder("(");
        for(String p : param) sb.append(p+", ");
        sb.replace(sb.length()-1, sb.length(), ")");
        return sb.toString();
    }
}
