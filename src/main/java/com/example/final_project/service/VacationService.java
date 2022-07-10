package com.example.final_project.service;

import com.example.final_project.dto.DeleteVacationDto;
import com.example.final_project.dto.LeaveListDto;
import com.example.final_project.dto.VacationRequestDto;
import com.example.final_project.dto.getVacationDataDto;
import com.example.final_project.mapper.VacationMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class VacationService {

    private final VacationMapper vacationMapper;

    @Transactional
    public List<LeaveListDto> vacationlist(String empno){
        return vacationMapper.readVacationList(empno);
    }

    @Transactional
    public void vacation(VacationRequestDto dto){
        if(vacationMapper.saveVacationReq(dto) == 0)
            throw new IllegalArgumentException("휴가 등록에 실패하였습니다.");
    }

    @Transactional
    public List<getVacationDataDto> getvacationdata(String empNo){return vacationMapper.readData(empNo);}

    @Transactional
    public void vacation(DeleteVacationDto dto){
        if(vacationMapper.deleteVacationReq(dto) == 0)
            throw new IllegalArgumentException("휴가 삭제에 실패하였습니다.");

        if(vacationMapper.rollbackAnnualLeave(dto)==0)
            throw new IllegalArgumentException("연차 사용에 실패하였습니다.");
    }
}
