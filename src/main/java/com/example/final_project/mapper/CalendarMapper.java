package com.example.final_project.mapper;

import com.example.final_project.dto.CalendarResponseDto;
// import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;

import java.util.List;

public interface CalendarMapper {

    // 출/퇴근 기록(QR 미등록 제외)
    @Select("select a.empno empno, b.dept_no deptno, on_work onwork, off_work offwork, DATE_FORMAT(off_work, '%H:%i') endwork, on_off_work OnOffWork, attendance, tardy, unregistered, etc, DATE_FORMAT(date, '%Y-%m-%d') date" +
            " from ((select a.att_time_id, a.empno, a.dept_no, a.date as on_work, off_work, a.on_off_work, TIMESTAMPDIFF(hour, date,off_work)-1 day_worktime from attendance_time a" +
            " join (select empno, date as off_work from attendance_time where on_off_work = 0) b on a.empno = b.empno" +
            " where a.empno = #{empno} and on_off_work = 1 and DATE_FORMAT(a.date,'%Y%M%D') = DATE_FORMAT(off_work,'%Y%M%D'))) a" +
            " INNER JOIN attendance_status b on DATE_FORMAT(on_work,'%Y%M%D') = DATE_FORMAT(b.date,'%Y%M%D') and a.empno = b.empno and unregistered != 0;")
//    List<CalendarResponseDto.vacationBuilder> findUserVacation(String empno);
    List<CalendarResponseDto> findUserWork(String empno);

    // 휴가 데이터
    @Select("select req title, reject, context, accept, reason, vacation_start VacationStart, DATE_FORMAT(vacation_start, '%Y-%m-%d') datestart, vacation_end VacationEnd, DATE_FORMAT(vacation_end, '%Y-%m-%d') dateend from attendance_req WHERE empno = #{empno} and req REGEXP '휴가|반차|연차' ORDER BY vacation_start;")
//    List<CalendarResponseDto.workBuilder> findUserWork(String empno);
    List<CalendarResponseDto> findUserVacation(String empno);

    // 이상근태 데이터(req 이전)
    @Select("select distinct dept_no deptno, date, accept,reject, attendance, tardy, agree, etc, unregistered, DATE_FORMAT(date, '%Y-%m-%d') notreqdate from attendance_status at join attendance_req ar on at.empno = ar.empno\n" +
            "where at.empno = #{empno} and etc REGEXP '결근|등록' and accept != true and reject != true and agree != true;")
    List<CalendarResponseDto> findUserNotWork(String empno);

}
