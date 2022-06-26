package com.example.final_project.mapper;

import com.example.final_project.dto.EmpListResponseDto;
import com.example.final_project.dto.SearchFilterRequestDto;
import org.apache.ibatis.annotations.SelectProvider;

import java.util.List;

public interface AdminMapper {
    @SelectProvider(type = SqlProvider.class, method = "selectEmployee")
    List<EmpListResponseDto> findByFilter(SearchFilterRequestDto dto, List<String> deptNo);
}
