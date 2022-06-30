package com.example.final_project.mapper;

import com.example.final_project.dto.DeleteVacationDto;
import org.apache.ibatis.annotations.Delete;

public interface DeleteVacationMapper {

    @Delete("DELETE FROM attendance_req WHERE req_id=#{reqId}")
    int save(DeleteVacationDto dto);
}
