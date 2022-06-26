package com.example.final_project.service;

import com.example.final_project.dto.EmpInfoDto;
import com.example.final_project.dto.EmpUpdateDto;
import com.example.final_project.exception.EmpException;
import com.example.final_project.exception.ErrorCode;
import com.example.final_project.exception.PasswordException;
import com.example.final_project.mapper.DeptMapper;
import com.example.final_project.mapper.EmpInfoCompMapper;
import com.example.final_project.mapper.EmployeeMapper;
import com.example.final_project.model.EmpInfoComp;
import com.example.final_project.model.Employee;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class ProfileService {

    private final EmployeeMapper employeeMapper;
    private final PasswordEncoder passwordEncoder;
    private final EmpInfoCompMapper empInfoCompMapper;
    private final DeptMapper deptMapper;
//    private final EmpUpdateDto empUpdateDto;

    @Transactional
    public EmpInfoDto getProfile(String empno){

        Employee employee = employeeMapper.findByUserId(empno).get();
        EmpInfoComp empInfoComp = empInfoCompMapper.findByEmpno(empno).get();

        return EmpInfoDto.builder().rankName(empInfoComp.getRank().getName())
                                    .deptName(deptMapper.findByDeptNo(empInfoComp.getDeptNo()))
                                    .name(employee.getName())
                                    .rankName(empInfoComp.getRank().getName())
                                    .extensionNum(empInfoComp.getExtensionNum())
                                    .profilePath(employee.getProfile())
                                    .role(employee.getRole())
                                    .build();
    }

    @Transactional
    public void updatePwd(EmpUpdateDto updateDto){
        employeeMapper.findByUserId(updateDto.getEmpno())
                .orElseThrow(() -> new EmpException(ErrorCode.EMP_NOTFOUND));

        String password = null;
        if(updateDto.getPwd() != null) {
            validatePassword(updateDto.getEmpno(), updateDto.getPwd(), updateDto.getNewPwd(), updateDto.getChkPwd());
            password = passwordEncoder.encode(updateDto.getNewPwd());
        }
        employeeMapper.updatePwd(EmpUpdateDto.toEmployeePwd(updateDto, password));
    }

    public void validatePassword(String empno, String pwd, String newPwd, String chkPwd){
        String originPwd = employeeMapper.findPasswordByEmpno(empno)
                .orElseThrow(() -> new EmpException(ErrorCode.EMP_NOTFOUND));

        System.out.println(empno);
        if(!passwordEncoder.matches(pwd, originPwd)) {
            System.out.println(passwordEncoder.encode(pwd));
            System.out.println(originPwd);
            throw new PasswordException(ErrorCode.WRONG_PASSWORD);
        }
        if(!newPwd.equals(chkPwd))
            throw new PasswordException(ErrorCode.MISMATCH_PASSWORD);

        if(pwd.equals(newPwd))
            throw new PasswordException(ErrorCode.SAME_PASSWORD);
    }

//    public void updateProfile(String param){
//    public void updateProfile(HashMap<String, Object> param){
//        employeeMapper.findByUserId(empUpdateDto.getEmpno())
//                .orElseThrow(() -> new EmpException(ErrorCode.EMP_NOTFOUND));
//
//        String profile = null;
//        if(param != null) ;
//            profile = empUpdateDto.getProfile();
//        System.out.println(profile);
//
//        employeeMapper.updateImg(EmpUpdateDto.toEmployeeImg(empUpdateDto, profile));
//    }
}
