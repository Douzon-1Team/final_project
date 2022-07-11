package com.example.final_project.mapper;

import com.example.final_project.dto.DeleteVacationDto;
import com.example.final_project.dto.LeaveListDto;
import com.example.final_project.dto.VacationRequestDto;
import com.example.final_project.dto.getVacationDataDto;
import org.apache.ibatis.annotations.Delete;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Select;
import org.apache.ibatis.annotations.Update;

import java.util.List;

public interface VacationMapper {

    @Insert("INSERT INTO attendance_req(empno, req, context, vacation_start, vacation_end)"+
            "VALUES(#{empNo},#{req}, #{comment},#{startFormat},#{endFormat})")
    int saveVacationReq(VacationRequestDto dto);

    @Select("SELECT A.req_id reqid, A.context, A.req, A.vacation_start vacationstart, A.vacation_end vacationend, A.reject, A.accept, A.reason, B.emp_name name, D.dept_name deptname FROM attendance_req A INNER JOIN employee B ON A.empno=B.empno INNER JOIN emp_info_comp C ON  A.empno=C.empno INNER JOIN dept D ON C.dept_no=D.dept_no WHERE A.empno=#{empNo} AND (A.req='휴가' OR A.req='오전반차' OR A.req='오후반차' OR A.req='시간연차')")
    List<LeaveListDto> readVacationList(String empno);

    @Delete("DELETE FROM attendance_req WHERE req_id=#{reqId}")
    int deleteVacationReq(DeleteVacationDto dto);

    @Update("UPDATE emp_info_comp SET remaining_annual_leave=remaining_annual_leave+#{grossHours} WHERE empno=#{empNo}")
    int rollbackAnnualLeave(DeleteVacationDto dto);

    @Select("SELECT A.GET_TO_WORK_TIME_SET workstart, A.GET_OFF_WORK_TIME_SET workend, A.get_to_work_time_set_f workstartf, A.get_off_work_time_set_f workendf, B.flexible flex, B.remaining_annual_leave remain " +
            "FROM manager_setting A " +
            "INNER JOIN emp_info_comp B ON A.dept_no=B.dept_no " +
            "WHERE A.dept_no=B.dept_no AND B.empno=#{empNo}")
    List<getVacationDataDto> readData(String empNo);
}
