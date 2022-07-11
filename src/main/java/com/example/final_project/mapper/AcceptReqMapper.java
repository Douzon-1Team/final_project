package com.example.final_project.mapper;

import com.example.final_project.dto.AcceptReqDto;
import com.example.final_project.dto.AcceptReqDto2;
import org.apache.ibatis.annotations.Delete;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Update;

public interface AcceptReqMapper {
    @Update("UPDATE attendance_req SET accept=1 WHERE req_id=#{reqid}")
    int acceptVacation(AcceptReqDto dto);

    @Update("UPDATE emp_info_comp SET remaining_annual_leave=remaining_annual_leave-#{minusHours} WHERE empno=#{empNo}")
    int updateAnnualLeave(AcceptReqDto dto);

    @Update("UPDATE attendance_req SET accept=1 WHERE req_id=#{reqid}")
    int acceptAttendance(AcceptReqDto2 dto);

    @Update("update attendance_status set attendance=0, tardy=0, agree=0, etc=null, unregistered=0 where empno=#{empNo} and date like '${temp}%'")
    int save2(AcceptReqDto2 dto);

    @Delete("delete from attendance_time where empno=#{empNo} and date like '${temp}%'")
    int deleteAbnormalAtt(AcceptReqDto2 dto);

    @Insert("insert into attendance_time " +
            "(empno, dept_no, date, time, on_off_work) " +
            "values (#{empNo},(select dept_no from emp_info_comp where empno=#{empNo}),#{start},null,1)")
    int fixOnTime(AcceptReqDto2 dto);

    @Insert("insert into attendance_time " +
            "(empno, dept_no, date, time, on_off_work) " +
            "values (#{empNo},(select dept_no from emp_info_comp where empno=#{empNo}),#{end},8,0)")
    int fixOffTime(AcceptReqDto2 dto);
}
