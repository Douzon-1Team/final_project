package com.example.final_project.mapper;

import com.example.final_project.dto.CalendarResponseDto;
import org.apache.ibatis.annotations.Select;

import java.util.List;

public interface MonthChatMapper {

    @Select("SELECT DATE_FORMAT(date,'%Y-%m') m, COUNT(*) count, DATE_FORMAT(date,'%m') month FROM attendance_status where empno = #{empno} and etc is null GROUP BY m;")
    List<CalendarResponseDto> findWorkDate(String year, String empno);

    @Select("SELECT DATE_FORMAT(vacation_start,'%Y-%m') m, COUNT(*) count, DATEDIFF(vacation_end, vacation_start) datediff, req vacation, DATE_FORMAT(vacation_start,'%m') month FROM attendance_req where empno = #{empno} and req REGEXP '휴가|오전반차|오후반차|시간연차' GROUP BY m;")
    List<CalendarResponseDto> findVacationDate(String year, String empno);

    @Select("SELECT DISTINCT DATE_FORMAT(s.date,'%Y-%m') m, COUNT(*) count, s.etc, DATE_FORMAT(s.date,'%m') month" +
            " FROM attendance_status s left join attendance_req r" +
            " on DATE_FORMAT(s.date,'%Y-%m-%d') = DATE_FORMAT(r.vacation_start,'%Y-%m-%d')" +
            " where s.empno = #{empno} and etc is not null and s.etc REGEXP '지각|무단결근|퇴근미등록|출근미등록' group by m;")
    List<CalendarResponseDto> findNonWorkDate(String year, String empno);
}
