package com.example.final_project.mapper;

import com.example.final_project.dto.AttendanceListDto;
import org.apache.ibatis.annotations.Select;

import java.util.List;

public interface AttendanceListMapper {
    @Select("SELECT A.req_id reqid, A.context, A.req, A.att_req_start vacationstart, A.att_req_end vacationend, A.reject, A.accept, A.reason, B.emp_name name, D.dept_name deptname FROM attendance_req A INNER JOIN employee B ON A.empno=B.empno INNER JOIN emp_info_comp C ON  A.empno=C.empno INNER JOIN dept D ON C.dept_no=D.dept_no WHERE A.empno=#{empNo} AND (A.req='지각' OR A.req='조퇴' OR A.req='결근' OR A.req='퇴근미등록' OR A.req='출근미등록')")
    List<AttendanceListDto> readAttendanceList(String empno);
}
