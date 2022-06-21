package com.example.final_project.service;

import com.example.final_project.dto.EmpInfoDto;
import com.example.final_project.mapper.DeptMapper;
import com.example.final_project.mapper.EmpInfoCompMapper;
import com.example.final_project.mapper.EmployeeMapper;
import com.example.final_project.model.EmpInfoComp;
import com.example.final_project.model.Employee;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class ProfileService {

    private final EmployeeMapper employeeMapper;
    private final EmpInfoCompMapper empInfoCompMapper;
    private final DeptMapper deptMapper;

    @Transactional
    public EmpInfoDto getProfile(String empno){

        Employee employee = employeeMapper.findByUserId(empno).get();
        EmpInfoComp empInfoComp = empInfoCompMapper.findByEmpno(empno).get();

        return EmpInfoDto.builder().rankName(empInfoComp.getRank().getName())
                                    .deptName(deptMapper.findByDeptNo(empInfoComp.getDeptno()))
                                    .name(employee.getName())
                                    .rankName(empInfoComp.getRank().getName())
                                    .extensionNum(empInfoComp.getExtensionNUm())
                                    .profile(employee.getProfile())
                                    .role(employee.getRole())
                                    .build();
    }
}
