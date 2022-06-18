package com.example.final_project.controller;

import com.example.final_project.dto.EmpInfoDto;
import com.example.final_project.dto.EmpUpdateDto;
import com.example.final_project.dto.TokenDto;
import com.example.final_project.mapper.EmpInfoCompMapper;
import com.example.final_project.mapper.EmployeeMapper;
import com.example.final_project.model.Code;
import com.example.final_project.model.EmpInfoComp;
import com.example.final_project.model.Employee;
import com.example.final_project.service.AdminService;
import com.example.final_project.service.QRService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@RestController
@RequiredArgsConstructor
public class AdminController {

    private final AdminService adminService;

    @PostMapping("/admin/register")
    public ResponseEntity register(@RequestBody EmpInfoDto registerDto){
        adminService.register(registerDto);
        return ResponseEntity.ok().build();
    }

    @PatchMapping("/admin/update")
    public ResponseEntity update(@RequestBody EmpUpdateDto updateDto, HttpServletResponse response) throws IOException {
        Code error = adminService.update(updateDto);

        if(error != null) response.sendError(error.getCode(), error.getMessage());

        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/admin/remove/{empno}")
    public ResponseEntity remove(@PathVariable String empno) {
        adminService.remove(empno);
        return ResponseEntity.ok().build();
    }
}