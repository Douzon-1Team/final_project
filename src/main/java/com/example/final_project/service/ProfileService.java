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

        // 1. 부서명 2. 이름 3. 직급 4. 사번 5. 사원번호 6. 프로필 사진(+사진업로드) 7. ++ 8. QR
        return EmpInfoDto.builder().rankName(empInfoComp.getRank().getName())
                                    .deptName(deptMapper.findByDeptNo(empInfoComp.getDeptno())) // 1. 부서명
                                    .name(employee.getName()) // 2. 이름
                                    .rankName(empInfoComp.getRank().getName()) // 직급
                                    //사번
                                    .extensionNum(empInfoComp.getExtensionNUm()) //내선번호
                                    .profile(employee.getProfile()) // 6. 프로필 사진
                                    .role(employee.getRole()) // ++ 권한에 따라 페이지 이동 다르게
                                    .build();
    }
}
