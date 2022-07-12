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
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Mapper
public interface AttendanceCheckMapper {
    @Select("SELECT a.empno empno, a.dept_no dept_no, attendance, tardy, etc, unregistered, flexible, get_to_work_time_set, get_off_work_time_set, get_to_work_time_set_f, get_off_work_time_set_f,date,\n" +
            "(select req from attendance_req where DATEDIFF(vacation_end,#{date}) >= 0 and DATEDIFF(vacation_start,#{date}) <= 0 and req REGEXP '휴가|오전반차|오후반차|시간연차' and  accept=1 and empno = #{empno}) req\n" +
            "FROM attendance_status a join emp_info_comp b join manager_setting c\n" +
            "on a.empno = b.empno and a.dept_no = b.dept_no = c.dept_no\n" +
            "WHERE a.empno = #{empno} and DATE_FORMAT(date,'%y%m%d') = DATE_FORMAT(#{date},'%y%m%d');\n")
    AttendanceCheckDto timeCheck(String empno, LocalDateTime date);

    @Insert("INSERT INTO attendance_time (empno, dept_no, date, on_off_work, time) VALUES (#{empno}, #{deptNo}, #{date}, #{onOffWork}, #{time})")
    int attendanceCheck(AttendanceTime attendanceTime);

    @Update("update attendance_status set ${columns} = #{values} where empno = #{empno} and date_format(date,'%Y-%m-%d') = #{date}")
    int updateAttendanceStatus(AttendanceUpdateDto attendanceUpdateDto);

    @Select("select * from attendance_time where DATE_FORMAT(date,'%y%m%d') = DATE_FORMAT(#{date},'%y%m%d') and empno = #{empno} and on_off_work = #{onOffWork}")
    Optional<AttendanceTime> findAttendanceTimeByEmpno(String empno, int onOffWork, LocalDateTime date);

    @Select("select * from attendance_time where DATE_FORMAT(date,'%y%m%d') = DATE_FORMAT(#{date},'%y%m%d') and empno = #{empno} and on_off_work = #{onOffWork}")
    Optional<AttendanceTime> findAttendanceTimeByEmpnoForTest(String empno, int onOffWork, LocalDateTime date);

    @Insert("insert into attendance_status (empno, dept_no, etc, date) values (#{empno},#{deptNo},#{etc},#{date})")
    int attendanceStatusCreate(AttendanceCheckDto attendanceCheckDto);

    @Select("select * from attendance_status where empno = #{empno} and date like '${date}%'")
    Optional<AttendanceStatus> findByEmpno(String empno, LocalDate date);

    @Select("select * from attendance_req where DATEDIFF(vacation_end,now())>0 and DATEDIFF(vacation_start,now()) <= 1 and req REGEXP '휴가|오전반차|오후반차|시간연차' and  accept=1 and empno = #{empno}")
    Optional<AttendanceReq> vacationCheckTomorrow(String empno);

    @Select("select req from attendance_req where DATEDIFF(vacation_end,#{date}) >= 0 and DATEDIFF(vacation_start,#{date}) <= 0 and req REGEXP '휴가|오전반차|오후반차|시간연차' and  accept=1 and empno = #{empno};")
    Optional<String> vacationCheckTheDay(String empno, LocalDateTime date);

    @Select("select * from attendance_time where DATE_FORMAT(date,'%y%m%d') = DATE_FORMAT(DATE_SUB(now(), INTERVAL 1 day),'%y%m%d') and empno = #{empno} and on_off_work = #{onOffWork}")
    Optional<AttendanceTime> unregisteredOffCheck(String empno, int onOffWork);

    @Select("select * from attendance_req where req='시간연차' and DATE_FORMAT(vacation_start,'%y%m%d') = DATE_FORMAT(#{date},'%y%m%d') and accept=1 and empno = #{empno}")
    AttendanceReq timeVacation(String empno, LocalDateTime date);

    @Select("select a.empno from attendance_status a join manager_setting b join emp_info_comp c on a.dept_no = b.dept_no and a.empno = c.empno where attendance=0 and DATE_FORMAT(date,'%y%m%d') = DATE_FORMAT(now(),'%y%m%d')")
    List<String> findByNonAttendanceToday();

    @Select("select a.empno, flexible, get_to_work_time_set,get_to_work_time_set_f,\n" +
            "(select req from attendance_req where DATEDIFF(vacation_end,now()) >= 0 and DATEDIFF(vacation_start,now()) <= 0 and req REGEXP '휴가|오전반차|오후반차|시간연차' and  accept=1 and empno = #{empno}) req\n" +
            "from attendance_status a join manager_setting b join emp_info_comp c\n" +
            "on a.dept_no = b.dept_no and a.empno = c.empno\n" +
            "where attendance=0 and DATE_FORMAT(date,'%y%m%d') = DATE_FORMAT(now(),'%y%m%d') and a.empno = #{empno};")
    AttendanceCheckDto tardyCheckPerHour(String empno);

}
