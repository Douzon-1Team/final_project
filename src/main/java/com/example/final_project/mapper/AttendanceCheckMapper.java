package com.example.final_project.mapper;

import com.example.final_project.dto.AttendanceCheckDto;
import com.example.final_project.dto.AttendanceUpdateDto;
import com.example.final_project.model.AttendanceStatus;
import com.example.final_project.model.AttendanceTime;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;
import org.apache.ibatis.annotations.Update;

import java.util.Optional;

@Mapper
public interface AttendanceCheckMapper {
    @Select("SELECT a.empno empno, a.dept_no dept_no, attendance, tardy, etc, unregistered, flexible, get_to_work_time_set, get_off_work_time_set, get_to_work_time_set_f, get_off_work_time_set_f FROM attendance_status a\n" +
            "join emp_info_comp b\n" +
            "join manager_setting c\n" +
            "on a.empno = b.empno and a.dept_no = b.dept_no = c.dept_no\n" +
            "WHERE a.empno=220101 and DATE_FORMAT(date,'%y%m%d') = DATE_FORMAT(now(),'%y%m%d')")
    AttendanceCheckDto timeCheck(String empno);

    @Insert("INSERT INTO attendance_time (empno, dept_no, date, on_off_work) VALUES (#{empno}, #{deptNo}, #{date}, #{onOffWork})")
    int attendanceCheck(AttendanceTime attendanceTime);

    @Update("update attendance_status set ${columns} = #{values} where empno = #{empno} and date_format(date,'%y%m%d') = date_format(now(),'%y%m%d')")
    int attendanceProblem(AttendanceUpdateDto attendanceUpdateDto);

    @Select("select * from attendance_time where DATE_FORMAT(date,'%y%m%d') = DATE_FORMAT(now(),'%y%m%d') and empno = #{empno} and on_off_work = #{onOffWork}")
    Optional<AttendanceTime> duplicatedCheck(String empno, int onOffWork);

}
