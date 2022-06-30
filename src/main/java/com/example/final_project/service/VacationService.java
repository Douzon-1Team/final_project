package com.example.final_project.service;

import com.example.final_project.dto.VacationRequestDto;
import com.example.final_project.mapper.VacationMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class VacationService {

    private final VacationMapper vacationMapper;
    public void vacation(VacationRequestDto dto){
        if(vacationMapper.save(dto) == 0)
            throw new IllegalArgumentException("휴가 등록에 실패하였습니다.");
    }
}
