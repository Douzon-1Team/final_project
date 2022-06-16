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
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
public class AdminController {

    private final AdminService adminService;

    @PostMapping("/admin/register")
    public ResponseEntity register(@RequestBody EmpInfoDto reg) throws Exception {
        adminService.register(reg);
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/admin/remove/{empno}")
    public ResponseEntity remove(@PathVariable String empno) {
        adminService.remove(empno);
        return ResponseEntity.ok().build();
    }
}