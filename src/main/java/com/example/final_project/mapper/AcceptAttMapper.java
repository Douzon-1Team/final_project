package com.example.final_project.mapper;

import com.example.final_project.dto.AcceptAttDto;
import org.apache.ibatis.annotations.Update;

public interface AcceptAttMapper {
    @Update("UPDATE ATTENDANCE_STATUS SET AGREE=1 WHERE ATT_STAT_ID=#{attstatid}")
    int save(AcceptAttDto dto);
}
