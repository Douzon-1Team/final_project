package com.example.final_project.service;

import com.example.final_project.dto.GetTargetDateDto;
import com.example.final_project.mapper.GetTargetDateMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class GetTargetDateService {
    private final GetTargetDateMapper getTargetDateMapper;
    public List<GetTargetDateDto> gettargetdate(String empNo, String date){
        return getTargetDateMapper.targetdate(empNo, date);
    }
}
