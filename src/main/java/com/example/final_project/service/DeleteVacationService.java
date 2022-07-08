package com.example.final_project.service;

import com.example.final_project.dto.DeleteVacationDto;
import com.example.final_project.mapper.DeleteVacationMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class DeleteVacationService {
    private final DeleteVacationMapper deleteVacationMapper;

    public void vacation(DeleteVacationDto dto){
        if(deleteVacationMapper.save(dto)==0)
            throw new IllegalArgumentException("휴가 삭제에 실패하였습니다.");

        if(deleteVacationMapper.save2(dto)==0)
            throw new IllegalArgumentException("휴가 삭제에 실패하였습니다.");
    }
}
