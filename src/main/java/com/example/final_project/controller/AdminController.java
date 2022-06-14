package com.example.final_project.controller;

import com.example.final_project.mapper.EmployeeMapper;
import com.example.final_project.model.Employee;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.DeleteMapping;q
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class AdminController {

    private final EmployeeMapper employeeMapper;
    private final PasswordEncoder passwordEncoder;

    @DeleteMapping("admin/remove")
    public int remove(@RequestBody Employee employee) {
        return employeeMapper.remove(employee.getEmpno());
    }
}