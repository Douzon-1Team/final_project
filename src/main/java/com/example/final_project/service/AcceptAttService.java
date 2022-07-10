package com.example.final_project.service;

import com.example.final_project.dto.AcceptAttDto;
import com.example.final_project.mapper.AcceptAttMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AcceptAttService {
    private final AcceptAttMapper acceptAttMapper;
    public void acceptatt(AcceptAttDto dto){
        if(acceptAttMapper.save(dto)==0)
            throw new IllegalArgumentException("에러 발생");
    }
}
