package com.example.final_project.mapper;

import com.example.final_project.dto.ChartListDto;
import com.example.final_project.dto.DeptVacationDto;
import com.example.final_project.dto.DeptVacationStatusDto;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;

import java.util.List;

@Mapper
public interface DeptVacationMapper {
    @Select("select concat(e.emp_name,' - ', req) title, ar.vacation_start, ar.vacation_end, c.rank, e.empno, e.emp_name name" +
            " from emp_info_comp c join employee e on c.empno = e.empno" +
            " join attendance_req ar on e.empno = ar.empno and ar.reject = 0" +
            " where c.dept_no in (select dept_no from emp_info_comp where empno=#{empno} and req REGEXP '휴가|오전반차|오후반차|시간연차');")
    List<DeptVacationDto> findDeptVacationList(String empno);

    @Select("SELECT dept_no, " +
            "       e.empno, " +
            "       e.emp_name, " +
            "       CONVERT((remaining_annual_leave)/8, INTEGER) AS 'remain_day', " +
            "       remaining_annual_leave AS 'remain_hour' " +
            "FROM attendance_req a " +
            "    LEFT OUTER JOIN employee e ON a.empno = e.empno " +
            "    LEFT OUTER JOIN emp_info_comp c ON a.empno = c.empno " +
            "GROUP BY empno " +
            "HAVING dept_no=#{deptNo}")
    List<DeptVacationStatusDto> findDeptVacationStatus(String deptNo);

    @Select("select e.empno, e.emp_name, a.req as etc, a.vacation_start as date, a.vacation_start as start, a.vacation_end as end " +
            "from attendance_req a  inner join employee e on a.empno = e.empno " +
            "where a.accept = 1 and e.empno like '__01%' and req REGEXP '시간연차|오전반차|오후반차|휴가'")
    List<ChartListDto> findDeptVacationHistory(String deptNo);
}
