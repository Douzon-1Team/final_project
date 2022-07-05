package com.example.final_project.mapper;

import com.example.final_project.dto.AttendanceCheckDto;
import com.example.final_project.dto.AttendanceUpdateDto;
import com.example.final_project.model.AttendanceReq;
import com.example.final_project.model.AttendanceStatus;
import com.example.final_project.model.AttendanceTime;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;
import org.apache.ibatis.annotations.Update;

import java.time.LocalDate;
import java.util.Optional;

@Mapper
public interface AttendanceCheckMapper {
    @Select("SELECT a.empno empno, a.dept_no dept_no, attendance, tardy, etc, unregistered, flexible, get_to_work_time_set, get_off_work_time_set, get_to_work_time_set_f, get_off_work_time_set_f FROM attendance_status a\n" +
            "join emp_info_comp b\n" +
            "join manager_setting c\n" +
            "on a.empno = b.empno and a.dept_no = b.dept_no = c.dept_no\n" +
            "WHERE a.empno=#{empno} and DATE_FORMAT(date,'%y%m%d') = DATE_FORMAT(now(),'%y%m%d')")
    AttendanceCheckDto timeCheck(String empno);

    @Insert("INSERT INTO attendance_time (empno, dept_no, date, on_off_work) VALUES (#{empno}, #{deptNo}, #{date}, #{onOffWork})")
    int attendanceCheck(AttendanceTime attendanceTime);

    @Update("update attendance_status_test set ${columns} = #{values} where empno = #{empno} and date_format(date,'%Y-%m-%d') = #{date}")
    int updateAttendanceStatus(AttendanceUpdateDto attendanceUpdateDto);

    @Select("select * from attendance_time where DATE_FORMAT(date,'%y%m%d') = DATE_FORMAT(now(),'%y%m%d') and empno = #{empno} and on_off_work = #{onOffWork}")
    Optional<AttendanceTime> findAttendanceTimeByEmpno(String empno, int onOffWork);

    @Insert("insert into attendance_status_test (empno, dept_no, etc, date) values (#{empno},#{deptNo},#{etc},#{date})")
    int attendanceStatusCreate(AttendanceCheckDto attendanceCheckDto);

    @Select("select * from attendance_status_test where empno = #{empno} and date like '${date}%'")
    Optional<AttendanceStatus> findByEmpno(String empno, LocalDate date);

    @Select("select * from attendance_req where DATEDIFF(vacation_end,now())>0 and DATEDIFF(vacation_start,now()) < 0 and req REGEXP '휴가|오전반차|오후반차|시간연차' and  accept=1 and empno = #{empno}")
    Optional<AttendanceReq> VacationCheck(String empno);

    @Select("select * from attendance_time where DATE_FORMAT(date,'%y%m%d') = DATE_FORMAT(DATE_SUB(now(), INTERVAL 1 day),'%y%m%d') and empno = #{empno} and on_off_work = #{onOffWork}")
    Optional<AttendanceTime> unregisteredOffCheck(String empno, int onOffWork);

    @Select("select * from attendance_req where req='시간연차' and DATE_FORMAT(vacation_start,'%y%m%d') = DATE_FORMAT(now(),'%y%m%d') and accept=1 and empno = #{empno}")
    AttendanceReq timeVacation(String empno);

}
