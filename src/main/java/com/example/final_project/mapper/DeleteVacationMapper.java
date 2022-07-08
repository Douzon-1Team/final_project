package com.example.final_project.mapper;

import com.example.final_project.dto.DeleteVacationDto;
import org.apache.ibatis.annotations.Delete;
import org.apache.ibatis.annotations.Update;

public interface DeleteVacationMapper {

    @Delete("DELETE FROM attendance_req WHERE req_id=#{reqId}")
    int save(DeleteVacationDto dto);

    @Update("UPDATE emp_info_comp SET remaining_annual_leave=remaining_annual_leave+#{grossHours} WHERE empno=#{empNo}")
    int save2(DeleteVacationDto dto);
}
