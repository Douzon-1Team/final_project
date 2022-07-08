package com.example.final_project.mapper;

import com.example.final_project.dto.RejectReqDto;
import org.apache.ibatis.annotations.Update;

public interface RejectReqMapper {
    @Update("UPDATE attendance_req SET reject=1, reason=#{reason} WHERE req_id=#{reqid}")
    int save(RejectReqDto dto);
}
