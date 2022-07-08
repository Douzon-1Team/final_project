package com.example.final_project.service;

import com.example.final_project.dto.AcceptReqDto;
import com.example.final_project.mapper.AcceptReqMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AcceptReqService {
    private final AcceptReqMapper acceptReqMapper;
    public void acceptreq(AcceptReqDto dto){
        if(acceptReqMapper.save(dto)==0)
            throw new IllegalArgumentException("신청서 승인에 실패하였습니다.");

        if(acceptReqMapper.save2(dto)==0)
            throw new IllegalArgumentException("신청서 승인에 실패하였습니다.");
    }
}
