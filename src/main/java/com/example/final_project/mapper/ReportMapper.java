package com.example.final_project.mapper;

import com.example.final_project.dto.ChartListDto;
import com.example.final_project.dto.DeptVacationStatusDto;
import com.example.final_project.dto.ReportDto;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;

import java.util.List;

@Mapper
public interface ReportMapper {

    @Select("select e.empno, e.emp_name name, c.rank, c.dept_no, etc, DATE_FORMAT(date, '%m') m, count(emp_name) count, DENSE_RANK() OVER (ORDER BY e.emp_name) sort\n" +
            "from emp_info_comp c join employee e on c.empno = e.empno join attendance_status `as` on e.empno = `as`.empno and etc REGEXP '지각|결근|퇴근미등록|출근미등록'\n" +
            "where c.dept_no in (select dept_no from emp_info_comp where empno=#{empno}) group by empno, m;")
    List<ReportDto> findAttendance(String empno);

    @Select("select c.empno, e.emp_name name, dept_no from emp_info_comp c join employee e on c.empno = e.empno where c.dept_no in (select dept_no from emp_info_comp where empno = #{empno});")
    List<ReportDto> findAllDeptMemberList(String empno);

    @Select("select c.empno, e.emp_name name, DATE_FORMAT(date,'%H:%i') onofftime, DATE_FORMAT(date,'%H') onofftimenum, time totaltime, on_off_work from attendance_time c\n" +
            "join employee e on c.empno = e.empno\n" +
            "where c.dept_no in (select dept_no from emp_info_comp where empno = #{empno}) and DATE_FORMAT(c.date, '%Y-%m-%d') = #{date} order by empno;")
    List<ReportDto> findDayWork(String empno, String date);

    @Select("select a.dept_no, dept_name, month(date) m, count(etc REGEXP '출근미등록|퇴근미등록|지각|결근') count\n" +
            "from dept a\n" +
            "inner join attendance_status b\n" +
            "where a.dept_no = b.dept_no\n" +
            "group by month(date), dept_name\n" +
            "order by dept_no, m;")
    List<ReportDto> findAllDeptAttendance();

    @Select("select e.empno, emp_name, etc, s.date as date, " +
            "(select date from attendance_time where on_off_work = 1 and date(date) = date(s.date) and empno = s.empno) as start, " +
            "(select date from attendance_time where on_off_work = 0 and date(date) = date(s.date) and empno = s.empno) as end " +
            "from attendance_status s inner join employee e on s.empno = e.empno " +
            "where etc REGEXP '지각|결근|퇴근미등록|출근미등록' and e.empno like '__${deptNo}%' order by s.date;")
    List<ChartListDto> findAttendanceProblem(String deptNo);

    @Select("SELECT dept_no, " +
            "       e.empno, " +
            "       e.emp_name, " +
            "       CONVERT((remaining_annual_leave)/8, INTEGER) AS 'remain_day', " +
            "       remaining_annual_leave AS 'remain_hour' " +
            "FROM attendance_req a " +
            "    LEFT OUTER JOIN employee e ON a.empno = e.empno " +
            "    LEFT OUTER JOIN emp_info_comp c ON a.empno = c.empno " +
            "GROUP BY empno " +
            "WHERE dept_no=#{deptNo}")
    List<DeptVacationStatusDto> findDeptVacationStatus(String deptNo);

    @Select("select e.empno, e.emp_name, a.req as etc, a.vacation_start as date, a.vacation_start as start, a.vacation_end as end " +
            "from attendance_req a  inner join employee e on a.empno = e.empno " +
            "where a.accept = 1 and e.empno like '__01%' and req REGEXP '시간연차|오전반차|오후반차|휴가'")
    List<ChartListDto> findDeptVacationHistory(String deptNo);
}
