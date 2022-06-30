package com.example.final_project.mapper;

import com.example.final_project.dto.DeptVacationDto;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;

import java.util.List;

@Mapper
public interface DeptVacationMapper {
    @Select("select ar.vacation_start, ar.vacation_end, c.rank, e.empno, e.emp_name\n" +
            "from emp_info_comp c join employee e on c.empno = e.empno\n" +
            "join attendance_req ar on e.empno = ar.empno and ar.reject = 0\n" +
            "where c.dept_no in (select dept_no from emp_info_comp where empno=#{empno})")
    public List<DeptVacationDto> findDeptVacationList(String empno);
}
