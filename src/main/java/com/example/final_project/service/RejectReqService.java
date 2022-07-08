package com.example.final_project.service;

import com.example.final_project.dto.RejectReqDto;
import com.example.final_project.mapper.RejectReqMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class RejectReqService {
    private final RejectReqMapper rejectReqMapper;
    public void rejectreq(RejectReqDto dto){
        if(rejectReqMapper.save(dto)==0)
            throw new IllegalArgumentException("신청서 반려에 실패하였습니다.");
    }
}
