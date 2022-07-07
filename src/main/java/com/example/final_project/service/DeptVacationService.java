package com.example.final_project.service;

import com.example.final_project.dto.DeptVacationDto;
import com.example.final_project.dto.DeptVacationStatusDto;
import com.example.final_project.exception.EmpException;
import com.example.final_project.exception.ErrorCode;
import com.example.final_project.mapper.DeptVacationMapper;
import com.example.final_project.mapper.EmpInfoCompMapper;
import com.example.final_project.mapper.EmployeeMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class DeptVacationService {
    private final DeptVacationMapper deptVacationMapper;
    private final EmployeeMapper employeeMapper;
    private final EmpInfoCompMapper empInfoCompMapper;

    @Transactional
    public List<DeptVacationDto> deptVacationList(String empno){
        employeeMapper.findByUserId(empno)
                .orElseThrow(() -> new EmpException(ErrorCode.EMP_NOTFOUND));
        return deptVacationMapper.findDeptVacationList(empno);
    }

    @Transactional
    public List<DeptVacationStatusDto> getDeptVacationStatus(String empno){
        String deptNo = empInfoCompMapper.findDeptNo(empno);
        List<DeptVacationStatusDto> dto = deptVacationMapper.findDeptVacationStatus(deptNo);
        return dto;
    }
}
