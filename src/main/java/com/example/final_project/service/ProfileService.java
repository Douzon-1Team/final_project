package com.example.final_project.service;

import com.example.final_project.dto.EmpUpdateDto;
import com.example.final_project.dto.ProfileDto;
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
import org.springframework.web.multipart.MultipartFile;

@Service
@RequiredArgsConstructor
public class ProfileService {

    private final EmployeeMapper employeeMapper;
    private final PasswordEncoder passwordEncoder;
    private final EmpInfoCompMapper empInfoCompMapper;
    private final DeptMapper deptMapper;
    private final S3Service s3Service;

    @Transactional
    public ProfileDto getProfile(String empno){

        Employee employee = employeeMapper.findByUserId(empno).get();
        EmpInfoComp empInfoComp = empInfoCompMapper.findByEmpno(empno).get();

        return ProfileDto.builder()
                .deptName(deptMapper.findByDeptNo(empInfoComp.getDeptNo()))
                .name(employee.getName())
                .rankName(empInfoComp.getRank().getName())
                .extensionNum(empInfoComp.getExtensionNum())
                .profilePath(employee.getProfile())
                .qrPath(employee.getQr())
                .build();
    }

    @Transactional
    public void updatePwd(EmpUpdateDto empUpdateDto){
        employeeMapper.findByUserId(empUpdateDto.getEmpno())
                .orElseThrow(() -> new EmpException(ErrorCode.EMP_NOTFOUND));

        String password = null;
        if(empUpdateDto.getPwd() != null) {
            validatePassword(empUpdateDto.getEmpno(), empUpdateDto.getPwd(), empUpdateDto.getNewPwd(), empUpdateDto.getChkPwd());
            password = passwordEncoder.encode(empUpdateDto.getNewPwd());
        }
        employeeMapper.updatePwd(EmpUpdateDto.toEmployeePwd(empUpdateDto, password));
    }

    public void validatePassword(String empno, String pwd, String newPwd, String chkPwd){
        String originPwd = employeeMapper.findPasswordByEmpno(empno)
                .orElseThrow(() -> new EmpException(ErrorCode.EMP_NOTFOUND));

        if(!passwordEncoder.matches(pwd, originPwd)) {
            throw new PasswordException(ErrorCode.WRONG_PASSWORD);
        }
        if(!newPwd.equals(chkPwd))
            throw new PasswordException(ErrorCode.MISMATCH_PASSWORD);

        if(pwd.equals(newPwd))
            throw new PasswordException(ErrorCode.SAME_PASSWORD);
    }

    @Transactional
    public void updateProfile(EmpUpdateDto empUpdateDto, MultipartFile profile){
        employeeMapper.findByUserId(empUpdateDto.getEmpno())
                .orElseThrow(() -> new EmpException(ErrorCode.EMP_NOTFOUND));
        s3Service.uploadProfile(profile, empUpdateDto.getEmpno());
    }
}
