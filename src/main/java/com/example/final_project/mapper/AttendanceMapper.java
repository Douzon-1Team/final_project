package com.example.final_project.mapper;

import com.example.final_project.dto.*;
import org.apache.ibatis.annotations.Delete;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Select;
import org.apache.ibatis.annotations.Update;

import java.util.List;

public interface AttendanceMapper {
    @Select("SELECT A.req_id reqid, A.context, A.req, A.att_req_start vacationstart, A.att_req_end vacationend, A.reject, A.accept, A.reason, B.emp_name name, D.dept_name deptname FROM attendance_req A INNER JOIN employee B ON A.empno=B.empno INNER JOIN emp_info_comp C ON  A.empno=C.empno INNER JOIN dept D ON C.dept_no=D.dept_no WHERE A.empno=#{empNo} AND (A.req='지각' OR A.req='조퇴' OR A.req='결근' OR A.req='퇴근미등록' OR A.req='출근미등록')")
    List<AttendanceListDto> readAttendanceList(String empno);

    @Select("SELECT A.accept, A.reject, A.req_id reqid, A.req, A.vacation_start startFormat1, A.att_req_start startFormat2, A.vacation_end endFormat1, A.att_req_end endFormat2, A.context comment, B.emp_name name, C.rank FROM attendance_req A INNER JOIN employee B ON A.empno=B.empno INNER JOIN emp_info_comp C ON A.empno=C.empno WHERE A.empno=#{empno}")
    List<ReqListDto> readReqList(String empno);

    @Update("UPDATE attendance_req SET reject=1, reason=#{reason} WHERE req_id=#{reqid}")
    int updateAttReq(RejectReqDto dto);

    @Delete("DELETE FROM attendance_req WHERE req_id=#{reqId}")
    int deleteAttReq(DeleteAttendanceDto dto);

    @Update("UPDATE ATTENDANCE_STATUS SET AGREE=1 WHERE ATT_STAT_ID=#{attstatid}")
    int updateAttStat(AcceptAttDto dto);

    @Insert("INSERT INTO attendance_req(empno, req, context, att_req_start, att_req_end)"+
            "VALUES(#{empNo},#{req}, #{comment},#{startFormat},#{endFormat})")
    int saveAttendanceReq(VacationRequestDto dto);

    @Select("SELECT att_stat_id attstatid, agree, etc FROM attendance_status WHERE date(date)=#{date} AND empno=#{empNo}")
    List<GetTargetDateDto> targetdate(String empNo, String date);
}
