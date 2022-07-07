package com.example.final_project.service;

import com.example.final_project.dto.getVacationDataDto;
import com.example.final_project.mapper.getVacationDataMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class getVacationDataService {
    private final getVacationDataMapper getVacationDataMapper;
    public List<getVacationDataDto> getvacationdata(String empNo){return getVacationDataMapper.readData(empNo);}
}
