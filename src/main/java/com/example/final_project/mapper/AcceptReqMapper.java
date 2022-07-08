package com.example.final_project.mapper;

import com.example.final_project.dto.AcceptReqDto;
import org.apache.ibatis.annotations.Update;

public interface AcceptReqMapper {
    @Update("UPDATE attendance_req SET accept=1 WHERE req_id=#{reqid}")
    int save(AcceptReqDto dto);

    @Update("UPDATE emp_info_comp SET remaining_annual_leave=remaining_annual_leave-#{minusHours} WHERE empno=#{empNo}")
    int save2(AcceptReqDto dto);
}
