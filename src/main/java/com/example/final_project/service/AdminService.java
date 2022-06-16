package com.example.final_project.service;

import com.example.final_project.dto.EmpInfoDto;
import com.example.final_project.dto.LoginRequestDto;
import com.example.final_project.mapper.EmpInfoCompMapper;
import com.example.final_project.mapper.EmployeeMapper;
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
    private final QRService qrService;
    private final PasswordEncoder passwordEncoder;

    @Transactional
    public void register(EmpInfoDto reg){

        String deptNo = empInfoCompMapper.findByDeptName(reg.getDeptName());
        String empno = createEmpNo(deptNo);
        String qr = qrService.createQR(empno);

        employeeMapper.save(Employee.builder()
                .name(reg.getName())
                .profile(reg.getProfile())
                .role(reg.getRole())
                .password(passwordEncoder.encode("dz"+empno))
                .empno(empno)
                .qr(qr)
                .build());

        empInfoCompMapper.save(EmpInfoComp.builder()
                .empno(empno)
                .deptno(deptNo)
                .email(empno+"@douzone.net")
                .rank(reg.getRank())
                .hireDate(reg.getHireDate())
                .extensionNUm(reg.getExtensionNum())
                .build());
    }

    public String createEmpNo(String deptno){

        int year = Calendar.getInstance().get(Calendar.YEAR)%100;
        String unique = String.format("%05d", empInfoCompMapper.count(deptno, year)+1);

        return year+deptno+unique;
    }

    @Transactional
    public void remove(String empno){
        employeeMapper.remove(empno);
    }
}
