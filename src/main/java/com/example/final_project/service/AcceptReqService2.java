package com.example.final_project.service;

import com.example.final_project.dto.AcceptReqDto2;
import com.example.final_project.mapper.AcceptReqMapper2;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AcceptReqService2 {
    private final AcceptReqMapper2 acceptReqMapper2;
    public void acceptreq2(AcceptReqDto2 dto){
        if(acceptReqMapper2.save(dto)==0)
            throw new IllegalArgumentException("조정1에 실패하였습니다.");
        if (acceptReqMapper2.save2(dto) == 0)
            throw new IllegalArgumentException("조정2에 실패하였습니다.");
        if(acceptReqMapper2.save3(dto)==0)
            throw new IllegalArgumentException("조정3에 실패하였습니다.");
        if(acceptReqMapper2.save4(dto)==0)
            throw new IllegalArgumentException("조정4에 실패하였습니다.");
        if(acceptReqMapper2.save5(dto)==0)
            throw new IllegalArgumentException("조정5에 실패하였습니다.");
    }
}
