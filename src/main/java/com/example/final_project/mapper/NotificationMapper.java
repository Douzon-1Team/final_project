package com.example.final_project.mapper;

import org.apache.ibatis.annotations.Select;

import java.time.LocalDateTime;
import java.util.List;

public interface NotificationMapper {
    @Select("select empno from attendance_status where tardy=1 and DATE_FORMAT(date,'%y%m%d') = DATE_FORMAT(now(),'%y%m%d') and dept_no = #{deptNo}")
    List<String> findTardyMemberByDept(String deptNo);

    @Select("select date from attendance_time where DATE_FORMAT(date,'%y%m%d') = DATE_FORMAT(now(),'%y%m%d') and on_off_work = 1 and empno = #{empno}")
    LocalDateTime findOnWorkTimeByempno(String empno);

}
