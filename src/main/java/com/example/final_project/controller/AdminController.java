package com.example.final_project.controller;

import com.example.final_project.dto.EmpInfoDto;
import com.example.final_project.mapper.EmpInfoCompMapper;
import com.example.final_project.mapper.EmployeeMapper;
import com.example.final_project.model.EmpInfoComp;
import com.example.final_project.model.Employee;
import com.example.final_project.service.AdminService;
import com.example.final_project.service.QRService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class AdminController {

    private final EmployeeMapper employeeMapper;
    private final EmpInfoCompMapper empInfoCompMapper;
    private final PasswordEncoder passwordEncoder;
    private final QRService qrService;
    private final AdminService adminService;

    @PostMapping("/admin/register")
    public HttpStatus register(@RequestBody EmpInfoDto reg) throws Exception {

        String deptNo = empInfoCompMapper.findByDeptName(reg.getDeptName());
        String empno = adminService.createEmpNo(deptNo);
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

        return HttpStatus.OK;
    }

    @DeleteMapping("/admin/remove")
    public int remove(@RequestBody Employee employee) {
        return employeeMapper.remove(employee.getEmpno());
    }
}