package com.example.final_project.service;

import com.example.final_project.dto.*;
import com.example.final_project.exception.EmpException;
import com.example.final_project.exception.ErrorCode;
import com.example.final_project.exception.PasswordException;
import com.example.final_project.mapper.AdminMapper;
import com.example.final_project.mapper.DeptMapper;
import com.example.final_project.mapper.EmpInfoCompMapper;
import com.example.final_project.mapper.EmployeeMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.ArrayList;
import java.util.Calendar;
import java.util.List;

@Service
@RequiredArgsConstructor
public class AdminService {

    private final EmpInfoCompMapper empInfoCompMapper;
    private final EmployeeMapper employeeMapper;
    private final DeptMapper deptMapper;
    private final AdminMapper adminMapper;
    private final QRService qrService;
    private final PasswordEncoder passwordEncoder;

    @Transactional
    public void register(EmpInfoDto empInfoDto){

        String deptNo = deptMapper.findByDeptName(empInfoDto.getDeptName());
        String empno = createEmpNo(deptNo);
        String pwd = passwordEncoder.encode("dz"+empno);
        String qr = qrService.createQR(empno);
        String email = empno+"@douzone.net";

        employeeMapper.save(EmpInfoDto.toEmployee(empInfoDto, empno, pwd, qr));
        empInfoCompMapper.save(EmpInfoDto.toEmpInfoComp(empInfoDto, empno, deptNo, email));
    }

    public String createEmpNo(String deptNo){

        int year = Calendar.getInstance().get(Calendar.YEAR)%100;
        String unique = String.format("%02d", empInfoCompMapper.countByDeptNo(deptNo, year)+1);

        return year+deptNo+unique;
    }

    @Transactional
    public void update(EmpUpdateDto updateDto){
        int updateResult = 0;
        if(updateDto.getPwd() != null) {
            validatePassword(updateDto.getEmpno(), updateDto.getPwd(), updateDto.getNewPwd(), updateDto.getChkPwd());
            String pwd = updateDto.getNewPwd();
            updateResult = employeeMapper.updateByEmpno(EmpUpdateDto.toEmployee(updateDto, passwordEncoder.encode(pwd)));
        }else{
            updateResult = employeeMapper.updateByEmpno(EmpUpdateDto.toEmployee(updateDto, null));
        }
        if(updateResult == 0) throw new EmpException(ErrorCode.EMP_NOTFOUND);

        String deptNo = deptMapper.findByDeptName(updateDto.getDeptName());
        empInfoCompMapper.updateByEmpno(EmpUpdateDto.toEmpInfoComp(updateDto, deptNo));
    }

    public void validatePassword(String empno, String pwd, String newPwd, String chkPwd){
        String originPwd = employeeMapper.findPasswordByEmpno(empno)
                .orElseThrow(() -> new EmpException(ErrorCode.EMP_NOTFOUND));

        if(!passwordEncoder.matches(pwd, originPwd))
            throw new PasswordException(ErrorCode.WRONG_PASSWORD);

        if(!newPwd.equals(chkPwd))
            throw new PasswordException(ErrorCode.MISMATCH_PASSWORD);

        if(pwd.equals(newPwd))
            throw new PasswordException(ErrorCode.SAME_PASSWORD);
    }

    @Transactional
    public List<EmpListResponseDto> list(@RequestBody SearchFilterRequestDto filterDto){
            List<String> deptNo = new ArrayList<>();
        if(filterDto.getDeptName() != null) {
            deptNo = deptMapper.findAllDeptNo(filterDto.getDeptName());
        }

        return adminMapper.findByFilter(filterDto, deptNo);
    }

    @Transactional
    public void remove(String empno){
        if(employeeMapper.remove(empno) == 0)
            throw new EmpException(ErrorCode.EMP_NOTFOUND);
    }
}
