package com.example.final_project.mapper;

import com.example.final_project.model.AttendanceReq;
import com.example.final_project.model.AttendanceStatus;
import org.apache.ibatis.annotations.Select;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

public interface NotificationMapper {
    @Select("select empno from attendance_status where tardy=1 and DATE_FORMAT(date,'%y%m%d') = DATE_FORMAT(now(),'%y%m%d') and dept_no = #{deptNo}")
    List<String> findTardyMemberByDept(String deptNo);

    @Select("select date from attendance_time where DATE_FORMAT(date,'%y%m%d') = DATE_FORMAT(now(),'%y%m%d') and on_off_work = 1 and empno = #{empno}")
    LocalDateTime findOnWorkTimeByempno(String empno);

    @Select("select * from attendance_status where agree = 1 and DATE_FORMAT(date,'%y%m%d') = DATE_FORMAT(now(),'%y%m%d') and empno=#{empno}")
    Optional<AttendanceStatus> findAgreeByempno(String empno);

    @Select("select * from attendance_req where accept = 1 and req = '' and DATE_FORMAT(att_req_start,'%y%m%d') = DATE_FORMAT(now(),'%y%m%d') and empno=#{empno}")
    Optional<AttendanceReq> findAcceptByempno(String empno);

}
