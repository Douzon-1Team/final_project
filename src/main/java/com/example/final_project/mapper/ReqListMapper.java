package com.example.final_project.mapper;

import com.example.final_project.dto.ReqListDto;
import org.apache.ibatis.annotations.Select;

import java.util.List;

public interface ReqListMapper {
    @Select("SELECT A.accept, A.reject, A.req_id reqid, A.req, A.vacation_start startFormat1, A.att_req_start startFormat2, A.vacation_end endFormat1, A.att_req_end endFormat2, A.context comment, B.emp_name name, C.rank FROM attendance_req A INNER JOIN employee B ON A.empno=B.empno INNER JOIN emp_info_comp C ON A.empno=C.empno WHERE A.empno=#{empno}")
    List<ReqListDto> readReqList(String empno);
}
