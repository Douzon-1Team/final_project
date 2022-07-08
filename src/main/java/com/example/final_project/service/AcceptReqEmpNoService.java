package com.example.final_project.service;

import com.example.final_project.dto.AcceptReqEmpNoDto;
import com.example.final_project.mapper.AcceptReqEmpNoMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class AcceptReqEmpNoService {
    private final AcceptReqEmpNoMapper acceptReqEmpNoMapper;
    public List<AcceptReqEmpNoDto> coEmpNo(String empno){
        return acceptReqEmpNoMapper.getEmpNo(empno);
    }
}
