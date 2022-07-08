package com.example.final_project.mapper;

import com.example.final_project.dto.ChartListDto;
import com.example.final_project.dto.ReportDto;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;

import java.util.List;

@Mapper
public interface ReportMapper {

    @Select("select e.empno, e.emp_name name, c.rank, c.dept_no, etc, DATE_FORMAT(date, '%m') m, count(emp_name) count, DENSE_RANK() OVER (ORDER BY e.emp_name) sort\n" +
            "from emp_info_comp c join employee e on c.empno = e.empno join attendance_status `as` on e.empno = `as`.empno and etc REGEXP '조퇴|지각|무단결근|퇴근미등록|출근미등록'\n" +
            "where c.dept_no in (select dept_no from emp_info_comp where empno=220101) group by empno, m;")
    List<ReportDto> findAttendance(String empno);

    @Select("select c.empno, e.emp_name name, dept_no from emp_info_comp c join employee e on c.empno = e.empno where c.dept_no in (select dept_no from emp_info_comp where empno = 220101);")
    List<ReportDto> findAllDeptMemberList(String empno);

    @Select("select c.empno, e.emp_name name, DATE_FORMAT(date,'%H:%i') onofftime, time totaltime, on_off_work from attendance_time c\n" +
            "join employee e on c.empno = e.empno " +
            "where c.dept_no in (select dept_no from emp_info_comp where empno = 220101) and DATE_FORMAT(c.date, '%Y-%m-%d') = '2022-06-29' order by empno;")
    List<ReportDto> findDayWork(String empno);

    @Select("select e.empno, emp_name, etc, s.date as date, " +
            "(select date from attendance_time where on_off_work = 1 and date(date) = date(s.date) and empno = s.empno) as start, " +
            "(select date from attendance_time where on_off_work = 0 and date(date) = date(s.date) and empno = s.empno) as end " +
            "from attendance_status s inner join employee e on s.empno = e.empno " +
            "where etc REGEXP '지각|결근|퇴근미등록|출근미등록' and e.empno like '__01%' order by s.date;")
    List<ChartListDto> findAttendanceProblem(String deptNo);
}