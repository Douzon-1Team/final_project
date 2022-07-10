package com.example.final_project.service;

import com.example.final_project.dto.AcceptReqDto;
import com.example.final_project.dto.AcceptReqDto2;
import com.example.final_project.mapper.AcceptReqMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class AcceptReqService {
    private final AcceptReqMapper acceptReqMapper;

    @Transactional
    public void acceptVacation(AcceptReqDto dto){
        if(acceptReqMapper.acceptVacation(dto) == 0)
            throw new IllegalArgumentException("신청서 승인에 실패하였습니다.");

        if(acceptReqMapper.updateAnnualLeave(dto) == 0)
            throw new IllegalArgumentException("신청서 승인에 실패하였습니다.");
    }

    @Transactional
    public void acceptAttendance(AcceptReqDto2 dto){
        if(acceptReqMapper.acceptAttendance(dto) == 0)
            throw new IllegalArgumentException("조정1에 실패하였습니다.");
        if (acceptReqMapper.save2(dto) == 0)
            throw new IllegalArgumentException("조정2에 실패하였습니다.");
        if(acceptReqMapper.deleteAbnormalAtt(dto)==0)
            throw new IllegalArgumentException("조정3에 실패하였습니다.");
        if(acceptReqMapper.fixOnTime(dto)==0)
            throw new IllegalArgumentException("조정4에 실패하였습니다.");
        if(acceptReqMapper.fixOffTime(dto)==0)
            throw new IllegalArgumentException("조정5에 실패하였습니다.");
    }
}
