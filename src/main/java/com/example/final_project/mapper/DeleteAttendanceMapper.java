package com.example.final_project.mapper;

import com.example.final_project.dto.DeleteAttendanceDto;
import org.apache.ibatis.annotations.Delete;

public interface DeleteAttendanceMapper {
    @Delete("DELETE FROM attendance_req WHERE req_id=#{reqId}")
    int save(DeleteAttendanceDto dto);
}
