package com.example.final_project.mapper;

import com.example.final_project.dto.CalendarResponseDto;
// import org.apache.ibatis.annotations.Mapper;
import com.example.final_project.dto.CalendarResponseDto2;
import org.apache.ibatis.annotations.Arg;
import org.apache.ibatis.annotations.ConstructorArgs;
import org.apache.ibatis.annotations.Select;

import java.util.List;

public interface CalendarMapper {

    @Select("select a.empno empno, a.dept_no deptNo, onwork, offwork, on_off_work OnOffWork, time, attendance, tardy, leave_early LeaveEarly, vacation, unregistered, date"+
            " from ((select a.empno, a.dept_no, a.date as onwork, offwork, a.on_off_work, TIMESTAMPDIFF(hour, date,offwork)-1 time from attendance_time a"+
                    " join (select empno, date as offwork from attendance_time where on_off_work = 0) b on a.empno = b.empno"+
                    " where a.empno = #{empno} and on_off_work = 1 and day(a.date) = day(b.offwork))) a"+
    " INNER JOIN attendance_status b on day(onwork) = day(b.date) and a.empno = b.empno;")
    List<CalendarResponseDto.vacationBuilder> findUserVacation(String empno);

    // 출근 데이터
    @Select("select req, reject, accept, vacation_start VacationStart, vacation_end VacationEnd from attendance_req WHERE empno = #{empno};")
    List<CalendarResponseDto.workBuilder> findUserWork(String empno);
}
