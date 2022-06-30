package com.example.final_project.service;

import com.example.final_project.dto.LeaveListDto;
import com.example.final_project.mapper.VacationListMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class VacationListService {
    private final VacationListMapper vacationListMapper;
    public List<LeaveListDto> vacationlist(String empno){
        return vacationListMapper.readVacationList(empno);
    }

}
