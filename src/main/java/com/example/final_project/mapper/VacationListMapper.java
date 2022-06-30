package com.example.final_project.mapper;

import com.example.final_project.dto.LeaveListDto;
import org.apache.ibatis.annotations.Select;

import java.util.List;

public interface VacationListMapper {
    @Select("SELECT A.req_id reqid, A.context, A.req, A.vacation_start vacationstart, A.vacation_end vacationend, A.reject, A.accept, A.reason, B.emp_name name, D.dept_name deptname FROM attendance_req A INNER JOIN employee B ON A.empno=B.empno INNER JOIN emp_info_comp C ON  A.empno=C.empno INNER JOIN dept D ON C.dept_no=D.dept_no WHERE A.empno=#{empNo} AND (A.req='휴가' OR A.req='오전반차' OR A.req='오후반차' OR A.req='시간연차')")
    List<LeaveListDto> readVacationList(String empno);
}
