package com.example.final_project.service;

import com.example.final_project.dto.EmpInfoDto;
import com.example.final_project.dto.EmpUpdateDto;
import com.example.final_project.dto.LoginRequestDto;
import com.example.final_project.mapper.DeptMapper;
import com.example.final_project.mapper.EmpInfoCompMapper;
import com.example.final_project.mapper.EmployeeMapper;
import com.example.final_project.model.Code;
import com.example.final_project.model.EmpInfoComp;
import com.example.final_project.model.Employee;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Calendar;

@Service
@RequiredArgsConstructor
public class AdminService {

    private final EmpInfoCompMapper empInfoCompMapper;
    private final EmployeeMapper employeeMapper;
    private final DeptMapper deptMapper;
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
    public Code update(EmpUpdateDto updateDto){
        if(updateDto.getPwd() != null) {
            Code error = validatePassword(updateDto.getEmpno(), updateDto.getPwd(), updateDto.getNewPwd(), updateDto.getChkPwd());
            if (error != null) return error;
        }
        String pwd = updateDto.getNewPwd();
        String deptNo = deptMapper.findByDeptName(updateDto.getDeptName());

        employeeMapper.updateByEmpno(EmpUpdateDto.toEmployee(updateDto, passwordEncoder.encode(pwd)));
        empInfoCompMapper.updateByEmpno(EmpUpdateDto.toEmpInfoComp(updateDto, deptNo));

        return null;
    }

    public Code validatePassword(String empno, String pwd, String newPwd, String chkPwd){
        String originPwd = employeeMapper.findPasswordByEmpno(empno)
                .orElseThrow(() -> new IllegalArgumentException("해당 사원이 존재하지 않습니다."));

        if(!passwordEncoder.matches(pwd, originPwd))
            return Code.WRONG_PASSWORD;
        if(!newPwd.equals(chkPwd))
            return Code.MISMATCH_PASSWORD;
        if(pwd.equals(newPwd))
            return Code.SAME_PASSWORD;

        return null;
    }

    @Transactional
    public void remove(String empno){
        employeeMapper.remove(empno);
    }
}
