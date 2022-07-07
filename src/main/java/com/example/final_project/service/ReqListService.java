package com.example.final_project.service;

import com.example.final_project.dto.ReqListDto;
import com.example.final_project.mapper.ReqListMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ReqListService {
    private final ReqListMapper reqListMapper;
    public List<ReqListDto> reqlist(String empno){
        return reqListMapper.readReqList(empno);
    }
}
