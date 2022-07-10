package com.example.final_project.mapper;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;
@Mapper
public interface SubComponentMapper {

    //ProgressBar52h
    @Select("select sum(TIMESTAMPDIFF(hour, date,off_work)-1) attendanceWeek from attendance_time a" +
            " join (select empno, date as off_work from attendance_time where empno= #{empno} and on_off_work = 0) b on a.empno = b.empno" +
            " where on_off_work = 1 and DATE_FORMAT(a.date,'%Y%M%D') = date_format(b.off_work,'%Y%M%D') and DATE_FORMAT(date, '%Y%U') = DATE_FORMAT(now(), '%Y%U')" +
            " GROUP BY DATE_FORMAT(date, '%Y%U')")
    Long attendanceWeek(String empno);
    @Select("select sum(if(dayofweek(date)=7 or dayofweek(date)=1,TIMESTAMPDIFF(hour, date,off_work), GREATEST(TIMESTAMPDIFF(hour, date,off_work)-9,0))) week_worktime from attendance_time a\n" +
            "join (select empno, date as off_work from attendance_time where empno= #{empno} and on_off_work = 0) b on a.empno = b.empno\n" +
            "where on_off_work = 1 and DATE_FORMAT(a.date,'%Y%M%D') = date_format(b.off_work,'%Y%M%D') and DATE_FORMAT(date, '%Y%U') = DATE_FORMAT(now(), '%Y%U')\n" +
            "GROUP BY DATE_FORMAT(date, '%Y%U');")
    Long overtimeWeek(String empno);
    @Select("select TIMESTAMPDIFF(hour,date,now()) from attendance_time" +
            " where empno = #{empno} and on_off_work = 1 and date_format(date,'%y%m%d') = date_format(now(),'%y%m%d')")
    Long todayWorkTime(String empno);
    //AnnualLeaveUsage
    @Select("select 15 + if(year(created_at) = year(now()),0,floor(((TIMESTAMPDIFF(YEAR , created_at, now()))-1)/2)) 연차일수 from employee where empno = #{empno}")
    int totalAnnualLeave(String empno);
    @Select("select FLOOR( remaining_annual_leave/8 ) from emp_info_comp where empno = #{empno};")
    int remainingAnnualLeaveDay(String empno);
    @Select("select remaining_annual_leave%8 from emp_info_comp where empno = #{empno}")
    int remainingAnnualLeaveTime(String empno);
    //AttendanceCount
    @Select("select count(case when attendance = 1 then 1 end) from attendance_status where empno = #{empno} and DATE_FORMAT(date,'%y%m') = DATE_FORMAT(now(),'%y%m')")
    int attendanceCount(String empno);
    @Select("select count(case when tardy = 1 then 1 end) from attendance_status where empno = #{empno} and DATE_FORMAT(date,'%y%m') = DATE_FORMAT(now(),'%y%m')")
    int tardyCount(String empno);
    @Select("select count(case when etc = '결근' then 1 end) from attendance_status where empno = #{empno} and DATE_FORMAT(date,'%y%m') = DATE_FORMAT(now(),'%y%m')")
    int absenteeismCount(String empno);
    @Select("select count(case when etc = '휴가' then 1 end) from attendance_status where empno = #{empno} and DATE_FORMAT(date,'%y%m') = DATE_FORMAT(now(),'%y%m')")
    int vacationCount(String empno);

}
